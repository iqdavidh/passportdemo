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
                        <input type="text" v-model="formlogin.user" required="required" class="form-control"/>
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" v-model="formlogin.password" required="required" class="form-control"/>
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
			enviarDatos: function () {


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


				const urlLogin = UrlApi.login;

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
						let data = response.data;
						if (data.success === "success") {
                          //es redireccionamiento ok

						} else {
							alert(data.msg);


						}
						return response.json();

					}).then((json) => {
					alert(json.text);
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
