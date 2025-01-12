import React from "react";
import { Button, Modal } from "antd";
import {
  Col,
  Form,
  Input,
  Row,
} from "antd";

interface CadUserModalProps {
  open: boolean;
  hide: () => void;
}

export const RegisterUser: React.FC<CadUserModalProps> = ({ open, hide }) => {
  return (
    <>
      <Modal
        title="Novo usuário" 
        open={open} 
        onCancel={hide}
        footer={
          <Button type="primary" onClick={hide}>
            Registrar
          </Button>
        }
      >
      <Form layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Nome"
                rules={[{ required: true, message: "Nome obrigatório!" }]}
              >
                <Input placeholder="Digite seu nome" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
