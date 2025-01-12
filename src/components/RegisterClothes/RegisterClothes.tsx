import React from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";

const { Option } = Select;

interface RegisterClothesDrawerProps {
  open: boolean;
  hide: () => void;
}

export const RegisterClothes: React.FC<RegisterClothesDrawerProps> = ({
  open,
  hide,
}) => {
  return (
    <>
      <Drawer
        title="Nova roupa"
        width={500}
        onClose={hide}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={hide}>Cancelar</Button>
            <Button onClick={hide} type="primary">
              Cadastrar
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="image"
                label="Imagem"
                rules={[{ required: true, message: "Imagem obrigatória!" }]}
              >
                <Input type="file" />
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
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="looks"
                label="Looks"
              >
                <Select placeholder="Selecione um look">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
