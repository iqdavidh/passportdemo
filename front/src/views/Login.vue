<template>
    <div class="login">

        <div class="row">
            <div class="col-xs-12 col-md-6">
                Passport demo and rooms
            </div>
            <div class="col-xs-12 col-md-6">
                <h3>Ingresar</h3>
                <form
                        v-on:submit.prevent="solicitarLogin"
                >
                    <div class="form-group">
                        <label>User</label>
                        <input type="text" v-model="formlogin.data.user" required="required" class="form-control"/>
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" v-model="formlogin.data.password" required="required"
                               class="form-control"/>
                    </div>

                    <button class="btn btn-primary" type="submit">
                        Ingresar
                    </button>

                </form>
            </div>
        </div>

    </div>
</template>

<script>


	export default {
		name: 'login',
		components: {},
		data() {
			return {
				formlogin: {
					isEnProceso: false,
					data: {user: '', password: ''}
				}
			}
		},
		methods: {
			solicitarLogin: function () {

				if (this.formlogin.isEnProceso) {
					return;
				}

				this.formlogin.isEnProceso = true;

				/*validar*/
				let dataLogin = this.formlogin.data;
				if (!dataLogin.password || !dataLogin.user) {
					alert("datos incorrectos");
					return;
				}


				const urlLogin = "http://localhost:3000/api/login";


				fetch(urlLogin, {
					mode: 'cors',
					method: 'POST',
					headers: {
						"Accept": "application/json",
						'Content-Type': "application/json"
					},
					body: JSON.stringify(dataLogin)
				})
					.then((response) => {
						return response.json();
					}).then((payload) => {

					if (payload.success === true) {
						//aqui ya podemos validar si hya un acceso
						if (!payload.isAutorizado) {
							//No tiene acceso TODO redirect home
							alert('no autorizado');
						}
					} else {
						alert(payload.msg);
					}

				}).catch(error => {

					alert(error);
				})
			}
		},
		mounted() {

			//debemos verificar si esta logueado todavia el usaurio
		}
	}
</script>
