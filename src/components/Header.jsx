import UserCard from "./UserCard";

function Header() {
    return (
        <header class="header">
            <div class="container header__container">
                <div class="header__left"><a class="logo" href="/"></a>
                    <h1 class="header__note">Маркировка упоминаний иностаных агентов и нежелательных организации в ваших
                        текстах.</h1>
                </div>
                <div class="header__right">
                    <UserCard />
                </div>
            </div>
        </header>
    );
}

export default Header;
