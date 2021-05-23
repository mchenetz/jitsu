// @Libs
import React, { useRef, useState } from 'react';
import { Button, Col, Dropdown, Form, Row } from 'antd';
import MonacoEditor from 'react-monaco-editor';
import cn from 'classnames';
// @Components
import { CodeSnippet } from '@./lib/components/components';
import { CodeEditor } from '@component/CodeEditor/CodeEditor';
// @Types
import { Event as RecentEvent } from '@./lib/components/EventsStream/EventsStream';
// @Icons
import CaretRightOutlined from '@ant-design/icons/lib/icons/CaretRightOutlined';
// @Styles
import styles from './CodeDebugger.module.less';
import CodeEditorComponent from '@component/CodeEditor/CodeEditorComponent';

interface Props {
  /***/
  run?: (values: FormValues) => any;
  /**
   * Prop to make code field hidden, visible by default
   * */
  codeFieldVisible?: boolean;
  /**
   * Prop to customize label of code field, `Code` by default
   * */
  codeFieldLabel?: string;
  /**
   * Pass this as true if you want to use custom button and control its state by yourself
   * */
  hideRunButton?: boolean;

  /**
   * Additional className for wrap div
   * */
  className?: string;
}

interface FormValues {
  event: RecentEvent;
  expression: string;
}

const CodeDebugger = ({
  className,
  codeFieldVisible = true,
  codeFieldLabel = 'Code',
  hideRunButton
}: Props) => {
  const objectMonacoRef = useRef<MonacoEditor>();
  const codeMonacoRef = useRef<MonacoEditor>();

  const [form] = Form.useForm();

  const handleChange = (name: 'object' | 'code') => (value: string) => {
    form.setFieldsValue({ [name]: value ? value : '' });
  };

  const handleFinish = async(values: FormValues) => {
    console.log('values: ', values);
  };

  return (
    <div className={cn(className)}>
      <div>

      </div>
      <Form form={form} onFinish={handleFinish}>
        <Row>
          <Col span={codeFieldVisible ? 12 : 24} className={cn(codeFieldVisible && 'pr-2')}>
            <Form.Item
              className={styles.field}
              colon
              label="Object"
              labelAlign="left"
              name="object"
            >
              <CodeEditorComponent handleChange={handleChange('object')} monacoRef={objectMonacoRef} height={200} />
            </Form.Item>
          </Col>

          {
            codeFieldVisible && (
              <Col span={12} className="pl-2">
                <Form.Item
                  className={styles.field}
                  colon
                  label={codeFieldLabel}
                  labelAlign="left"
                  name="code"
                >
                  <CodeEditor handleChange={handleChange('code')} monacoRef={codeMonacoRef} height={200} language="go" />
                </Form.Item>
              </Col>
            )
          }
        </Row>

        {
          !hideRunButton && <div className={styles.buttonContainer}>
            <Button type="primary" htmlType="submit" icon={<CaretRightOutlined />}>Run</Button>
          </div>
        }
      </Form>
    </div>
  )
};

CodeDebugger.displayName = 'CodeDebugger';

export { CodeDebugger };
