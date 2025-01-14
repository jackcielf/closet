import React, { useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  notification,
  Row,
  Select,
  Space,
} from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

const { Option } = Select;

interface RegisterClothesDrawerProps {
  open: boolean;
  hide: () => void;
}

const Context = React.createContext({ name: "Default" });

export const RegisterClothes: React.FC<RegisterClothesDrawerProps> = ({
  open,
  hide,
}) => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    
    const registrarClothes = () => {
      form
        .validateFields()
        .then((values) => {
          const existingClothes = JSON.parse(localStorage.getItem("clothes") || "[]");

          const newClothes = [
            ...existingClothes,
            {
              ...values,
              image: imageBase64,
            },
          ];

          localStorage.setItem("clothes", JSON.stringify(newClothes));
  
          hide();
          openNotification("topRight", "Sucesso!", "Salvo com sucesso!");
  
          resetarForm();
          reloadWindow();
        })
        .catch((error) => {
          console.error("Formulário inválido:", error);
        });
    };

    const resetarForm = () => {
      form.resetFields();
      setImageBase64(null);
    }

    const reloadWindow = () => {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageBase64(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    
  return (
    <>
      {contextHolder}

      <Drawer
        title="Nova roupa"
        width={500}
        onClose={hide}
        open={open}
        extra={
          <Space>
            <Button onClick={() => registrarClothes()} type="primary">
              Salvar
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="image"
                label="Imagem"
                rules={[{ required: true, message: "Imagem obrigatória!" }]}
              >
                <Input type="file" onChange={handleImageChange} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="inventary"
                label="Inventário"
              >
                <Select placeholder="Selecione um inventário">
                  <Option value="vestidos">Vestidos</Option>
                  <Option value="blusas">Blusas</Option>
                  <Option value="calcas">Calças</Option>
                  <Option value="saias">Saias</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="looks"
                label="Looks"
              >
                <Select placeholder="Selecione um look">
                  <Option value="casuais">Casuais</Option>
                  <Option value="sociais">Sociais</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
