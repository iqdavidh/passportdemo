<template>
    <div>
        Private Page
    </div>
</template>

<script>


	export default {
		name: 'private_page',
		components: {},
		data() {
			return {};
		},
		methods: {},
		mounted() {

			const url = "http://localhost:3000/api/private-only-admin";

			fetch(url, {
					mode: 'cors',
					method: 'GET',
					headers: {
						"Accept": "application/json",
						'Content-Type': "application/json"
					}
				}
			)
				.then((response) => {
					return response.json();
				})
				.then((payload) => {
					console.log(payload);
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
	}

</script>
