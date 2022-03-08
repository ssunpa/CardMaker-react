import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService }) => {
    const [cards, setCards] = useState({
        1: {
            id: '1',
            name: 'user1',
            company: 'unknown',
            theme: 'light',
            title: 'unknown',
            email: 'user@unknown.com',
            message: 'unknown',
            fileName: 'unknown',
            fileURL: null,
        },
        2: {
            id: '2',
            name: 'user2',
            company: 'unknown',
            theme: 'dark',
            title: 'unknown',
            email: 'user@unknown.com',
            message: 'unknown',
            fileName: 'unknown',
            fileURL: null,
        },
        3: {
            id: '3',
            name: 'user3',
            company: 'unknown',
            theme: 'colorful',
            title: 'unknown',
            email: 'user@unknown.com',
            message: 'unknown',
            fileName: 'unknown',
            fileURL: null,
        },
    });

    const navigate = useNavigate();
    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        authService.onAuthChange((user) => {
            if (!user) {
                navigate('/');
            }
        });
    });

    const createOrUpdateCard = (card) => {
        setCards((cards) => {
            const updated = { ...cards };
            updated[card.id] = card;
            return updated;
        });
    };

    const deleteCard = (card) => {
        setCards((cards) => {
            const updated = { ...cards };
            delete updated[card.id];
            return updated;
        });
    };
    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor
                    FileInput={FileInput}
                    cards={cards}
                    addCard={createOrUpdateCard}
                    updateCard={createOrUpdateCard}
                    deleteCard={deleteCard}
                />
                <Preview cards={cards} />
            </div>
            <Footer />
        </section>
    );
};

export default Maker;
