import React from "react";
import { Button, Modal, notification } from "antd";
import { Col, Form, Input, Row } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

interface CadUserModalProps {
  open: boolean;
  hide: () => void;
}

const Context = React.createContext({ name: "Default" });

export const RegisterUser: React.FC<CadUserModalProps> = ({ open, hide }) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const registrar = () => {
    form
      .validateFields()
      .then((values) => {
        localStorage.setItem("user", JSON.stringify(values));

        hide();
        openNotification("topRight", "Sucesso!", "Registrado com sucesso!");

        form.resetFields();
      })
      .catch((error) => {
        console.error("Formulário inválido:", error);
      });
  };

  const openNotification = (
    placement: NotificationPlacement,
    message: string,
    content: string
  ) => {
    api.info({
      message: message,
      description: <Context.Consumer>{() => content}</Context.Consumer>,
      placement,
    });
  };

  return (
    <>
      {contextHolder}

      <Modal
        title="Novo usuário"
        open={open}
        onCancel={hide}
        footer={
          <Button type="primary" onClick={() => registrar()}>
            Registrar
          </Button>
        }
      >
        <Form form={form} layout="vertical">
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
