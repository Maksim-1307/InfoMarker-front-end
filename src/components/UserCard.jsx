function UserCard(){

    const avatarStyle = { 'background-image': 'url("../img/default-avatar.jpg");'};

    return(
        <div class="user-card">
            <div class="user-card__text"><a class="user-card__admin-panel" href="#">Панель управления</a><a
                class="user-card__name" href="#">Иванов Иван Иванович</a>
                <div class="user-card__links"><a href="#">Настройки</a><a href="#">Выйти</a></div>
            </div><button class="user-card__avatar" style={avatarStyle} >
                <div class="user-card__status">админ</div>
            </button>
            <div class="user-card-opened" state="closed">
                <div class="user-card">
                    <div class="user-card__text"><a class="user-card__admin-panel" href="#">Панель
                        управления</a><a class="user-card__name" href="#">Иванов Иван Иванович</a>
                        <div class="user-card__links"><a href="#">Настройки</a><a href="#">Выйти</a></div>
                    </div><button class="user-card__avatar" style={avatarStyle}
                        >
                        <div class="user-card__status">админ</div>
                    </button>
                </div>
            </div>
        </div>
    );
}

// style = "background-image:url('img/default-avatar.jpg')"

export default UserCard;

