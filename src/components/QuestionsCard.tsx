import React from 'react';
//types ımport
import { AnswerObject } from '../App'
//styles import 
import {Wrapper,ButtonWrapper} from './QuestionCard.styles'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined; //ıt can also be undefined  
    questionNum: number;
    totalQuestions: number;
}

const QuestionsCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNum,
    totalQuestions
}) => (
    <Wrapper>
        <p className="number">
            Question: {questionNum} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers.map((answer) => (
                <ButtonWrapper 
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                    >
                    <button value={answer} disabled={userAnswer ? true : false} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />

                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

export default QuestionsCard