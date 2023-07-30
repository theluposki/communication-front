<template>
    <div class="wrapper">
        <div class="nav">
            <div class="activeLogin">
                Login
            </div>
            <div class="activeLogup">
                Logup
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    background-color: transparent;
    width: 100%;
    min-height: 100vh;
}

.nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: var(--dark2);
    min-height: 60px;
}

.activeLogin, .activeLogup {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    background-color: transparent;
    font-weight: 600;
    cursor: pointer;
}
</style>