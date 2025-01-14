import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import { Form, Input } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

interface CadUserModalProps {
  open: boolean;
  hide: () => void;
}

interface User {
  name: string;
}

const Context = React.createContext({ name: "Default" });

export const RegisterUser: React.FC<CadUserModalProps> = ({ open, hide }) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [user, setUser] = useState<User>();

  const registrar = () => {
    form
      .validateFields()
      .then((values) => {
        localStorage.setItem("user", JSON.stringify(values));

        hide();
        openNotification("topRight", "Sucesso!", "Registrado com sucesso!");

        form.resetFields();
        reloadWindow();
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

  const reloadWindow = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "[]");
    setUser(storedUser);
  }, []);

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
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: user?.name,
          }}
        >
          <Form.Item
            name="name"
            label="Nome"
            rules={[
              { required: true, message: "Nome obrigatório!" },
              { min: 3, message: "O nome deve ter no mínimo 3 caracteres!" },
              { max: 12, message: "O nome deve ter no máximo 12 caracteres!" },
            ]}
          >
            <Input placeholder="Digite seu nome" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
