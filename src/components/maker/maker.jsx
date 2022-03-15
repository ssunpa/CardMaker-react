import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService, cardRepository }) => {
    const locationState = useLocation().state;
    const [cards, setCards] = useState({});
    const [userId, setUserId] = useState(locationState && locationState.id);

    const navigate = useNavigate();
    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        if (!userId) {
            return;
        }
        const stopSync = cardRepository.syncCards(userId, (cards) => {
            setCards(cards);
        });
        return () => stopSync();
    }, [userId, cardRepository]);

    useEffect(() => {
        authService.onAuthChange((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                navigate('/');
            }
        });
    }, [userId, authService]);

    const createOrUpdateCard = (card) => {
        setCards((cards) => {
            const updated = { ...cards };
            updated[card.id] = card;
            return updated;
        });
        cardRepository.saveCard(userId, card);
    };

    const deleteCard = (card) => {
        setCards((cards) => {
            const updated = { ...cards };
            delete updated[card.id];
            return updated;
        });
        cardRepository.removeCard(userId, card);
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
