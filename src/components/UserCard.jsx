import React, { useContext, useEffect, useState } from "react";
import { reload_user_card } from "../animations.js";
import { AppContext } from "../AppContext.js";
import defaultAvatar from "../img/default-avatar.jpg"

function UserCard(){

    const appContext = useContext(AppContext);
    const { loggedIn } = appContext;
    const { isAdmin } = appContext;

    const avatar = defaultAvatar;

    const adminCard = (
        <>
            <div class="user-card__text">
                <a class="user-card__admin-panel" href="#">Панель управления</a>
                <a class="user-card__name" href="#">Иванов Иван Иванович</a>
                <div class="user-card__links">
                    <a href="#">Настройки</a>
                    <a href="#">Выйти</a>
                </div>
            </div>
            <button class="user-card__avatar" style={{ backgroundImage: `url(${defaultAvatar})` }} >
                <div class="user-card__status">админ</div>
            </button>
        </>
    );
    const loggedInCard = (
        <>
            <div class="user-card__text">
                <a class="user-card__name" href="#">Иванов Иван Иванович</a>
                <div class="user-card__links">
                    <a href="#">Настройки</a>
                    <a href="#">Выйти</a>
                </div>
            </div>
            <button class="user-card__avatar" style={{ backgroundImage: `url(${defaultAvatar})` }} >
            </button>
        </>
    );
    const unknownUserCard = (
        <>
            <div class="user-card__text">
                <a class="user-card__name" href="#">Вход не выполнен</a>
                <div class="user-card__links">
                    <a href="#">Вход</a>
                    <a href="#">Регистрация</a>
                </div>
            </div>
            <button class="user-card__avatar" style={{ backgroundImage: `url(${defaultAvatar})` }} >
            </button>
        </>
    );

    const [currentCard, setCurrentCard] = useState(unknownUserCard);

    useEffect(() => {
        if (loggedIn) {
            if (isAdmin) {
                setCurrentCard(adminCard);
            } else {
                setCurrentCard(loggedInCard);
            }
        } else {
            setCurrentCard(unknownUserCard);
        }
    }, [loggedIn, isAdmin]);

    useEffect(() => {
        reload_user_card(); 
    }, []);

    return(
        <div class="user-card">
            {currentCard}
            <div class="user-card-opened" state="closed">
                <div class="user-card">
                    {currentCard}
                </div>
            </div>
        </div>
    );
}



export default UserCard;

