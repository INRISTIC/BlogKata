import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteArticle } from '../../redux/slices/listArticle';

import ModalBtnStyle from './ModalBtn.module.scss';

const ModalBtn = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const handleDeleteBtn = async () => {
    if (slug) {
      return dispatch(deleteArticle(slug));
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await handleDeleteBtn();
    setIsModalVisible(false);
    navigate('/', { replace: true });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button className={ModalBtnStyle.deleteBtn} type="primary" onClick={showModal}>
        Delete
      </Button>
      <Modal title="" visible={isModalVisible} onOk={handleOk} cancelText="No" okText="Yes" onCancel={handleCancel}>
        Are you sure to delete this article?
      </Modal>
    </>
  );
};

export default ModalBtn;
