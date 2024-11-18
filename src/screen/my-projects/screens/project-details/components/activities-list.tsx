import React from 'react';
import ActivityCard from './activity-card';

const RenderActivityList = ({ item, index, len }: { item: any, index: number, len: number }) => {
  const {
    activity_title,
    activity_date,
    activity_time,
    remark,
    uploaded_document1,
    uploaded_document1_path,
    uploaded_document2,
    uploaded_document2_path,
    uploaded_document3,
    uploaded_document3_path,
    uploaded_document4,
    uploaded_document4_path,
    uploaded_document5,
    uploaded_document5_path,
  } = item;
  let files = [
    { filename: uploaded_document1, filePath: uploaded_document1_path },
    { filename: uploaded_document2, filePath: uploaded_document2_path },
    { filename: uploaded_document3, filePath: uploaded_document3_path },
    { filename: uploaded_document4, filePath: uploaded_document4_path },
    { filename: uploaded_document5, filePath: uploaded_document5_path },
  ];
  let fileArray;
  fileArray = files.filter(item => {
    if (!!item.filename) {
      return item;
    }
  });
  return (
    <ActivityCard
      title={activity_title}
      datetime={`${activity_date} ${activity_time}`}
      remark={remark}
      Files={fileArray}
      showdots={index + 1 !== len ? true : false}
    />
  )
};
export default RenderActivityList;