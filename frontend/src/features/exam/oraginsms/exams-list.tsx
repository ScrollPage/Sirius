import { Col } from '@/src/lib/styled-components-layout';
import { ConditionalList } from '@/src/ui';
import { useStoreMap } from 'effector-react';
import React from 'react';
import { $examsRegistry } from '../model';
import { ExamItem } from './exam-item';

interface Props {
  ids: number[];
  renderEmpty?: () => React.ReactNode;
}

export const ExamsList: React.FC<Props> = ({ ids, renderEmpty }) => {
  return (
    <ConditionalList
      list={ids}
      renderEmpty={renderEmpty}
      renderExists={(cardsIds) => (
        <Col gap="10px" width="100%">
          {cardsIds.map((cardId) => (
            <ExamComponent id={cardId} key={cardId} />
          ))}
        </Col>
      )}
    />
  );
};

interface ExamComponentProps {
  id: number;
}

const ExamComponent: React.FC<ExamComponentProps> = ({ id }) => {
  const exam = useStoreMap({
    store: $examsRegistry,
    keys: [id],
    fn: (registry, [examId]) => registry[examId],
  });

  return <ExamItem exam={exam} />;
};
