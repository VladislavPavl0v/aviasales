import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'antd';

function Message() {
  const errorFromRedux = useSelector((state) => state.aviasales.error);
  const announcement = (error) => {
    if (error) {
      return error;
    }
    return 'Рейсов, подходящих под заданные фильтры, не найдено!';
  };
  return (
    <Alert
      style={{ height: '100%', width: '100%' }}
      message="Внимание"
      description={announcement(errorFromRedux)}
      type="info"
      showIcon
    />
  );
}

export default Message;
