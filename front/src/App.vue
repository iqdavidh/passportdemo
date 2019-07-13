<template>
    <div id="app">
        <div id="nav">


            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">

                        <li class="nav-item active">
                            <router-link to="/">Home</router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/rooms">Rooms</router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/private-page">Private Page</router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/private-only-admin">Private only admin</router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/login">Login</router-link>
                        </li>

                        <li class="nav-item">
                            <a>Logout</a>
                        </li>

                    </ul>
                </div>
            </nav>


        </div>
        <router-view/>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
