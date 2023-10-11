import React, { useEffect } from 'react';
import { Progress } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { updateLoadingProgress } from '../../store/aviasalesSlice';
import style from './loader.module.scss';

function ContentLoader() {
  const colorsLoader = { '0%': '#f3f7fa', '100%': '#2196f3' };
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.aviasales.isLoading);

  useEffect(() => {
    if (isLoading < 100 && isLoading >= 0) {
      const interval = setInterval(() => {
        dispatch(updateLoadingProgress(5));
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isLoading, dispatch]);
  return (
    <div className={style.loader}>
      {isLoading < 100 ? (
        <Progress
          percent={isLoading}
          strokeColor={colorsLoader}
          showInfo={false}
          trailColor="transparent"
        />
      ) : null}
    </div>
  );
}

export default ContentLoader;
