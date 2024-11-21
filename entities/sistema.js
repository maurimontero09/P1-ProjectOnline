if (!localStorage.getItem('reservID')) localStorage.setItem('reservID', 0)
class Sistema {
	constructor() {
		this.users = [];
		if (localStorage.getItem("destinos")) {
			this.preLoadDest = JSON.parse(localStorage.getItem("destinos"))
		} else {
			this.preLoadDest = {
				1: new Dest("CARIBE", 1050, true, true, "../img/caribe.webp", "7 días", "6 noches en hotel 5 estrellas", "All inclusive", true, true, 34, 'DEST_ID_1'),
				2: new Dest("EUROPA", 4500, false, true, "../img/europa.webp", "15 días", "14 noches en hotel 4 estrellas", "Desayuno incluido", true, true, 84, 'DEST_ID_2'),
				3: new Dest("ASIA Y ÁFRICA", 7850, true, true, "../img/africa.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 23, 'DEST_ID_3'),
				4: new Dest("AMSTERDAM", 7850, false, true, "../img/amsterdam.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 123, 'DEST_ID_4'),
				5: new Dest("MARRUECOS", 7850, true, true, "../img/marruecos.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 99, 'DEST_ID_5'),
				6: new Dest("MENDOZA", 7850, false, true, "../img/mendoza.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 27, 'DEST_ID_6'),
				7: new Dest("RÍO DE JANEIRO", 7850, true, false, "../img/rio.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 290, 'DEST_ID_7'),
				8: new Dest("ROMA", 7850, true, false, "../img/roma.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 54, 'DEST_ID_8'),
				9: new Dest("RANDOM", 7850, false, false, "../img/viajeAmigos.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 341, 'DEST_ID_9'),
			};
		}
		if (localStorage.getItem("reservations")) {
			this.reservations = JSON.parse(localStorage.getItem("reservations"))
		} else {
			this.reservations = [];
		}
	}
	preLoadData() {
		this.users.push(
			new User(true, "John", "Doe", "johndoe32", "password123", "4111111111111111", 123, 15000, 1500)
		);
		this.users.push(
			new User(true, "Jane", "Smith", "janesmith22", "securepass456", "5500000000000004", 456, 15000, 2000)
		);
		this.users.push(
			new User(true, "Mike", "Johnson", "mikej12", "mike2023", "340000000000009", 789, 15000, 800)
		);
		this.users.push(
			new User(true, "Emily", "Davis", "emilyd33", "emily!789", "6011000000000004", 321, 15000, 1000)
		);
		this.users.push(
			new User(true, "Chris", "Wilson", "chrisw23", "chris#2023", "374245455400126", 654, 15000, 1200)
		);
		this.users.push(
			new User(false, "Mabel", "Love", "mabellove12", "Love@312", "4111111111111111", 245, 15000, 330)
		);
		this.users.push(
			new User(false, "Susie", "Rhodes", "susierhodes44", "Love@Rhodes#89", "5500000000000004", 332, 15000, 340)
		);
		this.users.push(
			new User(false, "Alfred", "Reeves", "alfredreeves56", "Reeves*78", "340000000000009", 113, 15000, 550)
		);
		this.users.push(
			new User(false, "Isabella", "Warner", "isabellawarner99", "Warner!45", "4024007136512380", 452, 15000, 230)
		);
		this.users.push(
			new User(false, "Douglas", "Cain", "douglascain45", "Douglas#94", "4012888888881881", 458, 15000, 4425)
		);
	}
	/**
	 * Funcion para buscar un usuario en el objeto de usuarios.
	 * @param {string} username 
	 * @param {string} password 
	 * @returns booleano - true si el usuario fue encontrado, false si no. Ademas crea un array con los datos del usuario loggeado y lo guarda en el local storage. 
	 */
	findingUser(username, password) {
		let usersDatabase = window.Sistema.getItemToLocalStorage('usersDatabase')
		let userFound = usersDatabase.find(user => user.userName === username && user.userPassword === password);

		if (userFound) {
			this.userLoggedDetails(username);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Funcion para buscar si es admin y redirigir acordemenete.
	 * @param {string} username 
	 * @returns booleano - admin = true, cliente = false.
	 */

	isAdmin(username) {
		const user = this.users.find(user => user.userName === username);
		return user ? user.admin === true : false;
	}

	registerUser(firstName, lastName, userName, userPassword, userCreditCard, userCVC) {
		let usersFromStorage = JSON.parse(localStorage.getItem('usersDatabase'));
		let newUser = new User(false, firstName, lastName, userName, userPassword, userCreditCard, userCVC, 15000, 0);
		usersFromStorage.push(newUser);
		localStorage.setItem('usersDatabase', JSON.stringify(usersFromStorage));
		this.userLoggedDetails(userName);
	}

	findUsername(username) {
		let usersDatabase = window.Sistema.getItemToLocalStorage('usersDatabase')
		let isNew = true;
		usersDatabase.forEach(User => {
			if (User.userName === username) {
				isNew = false;
			}
		});
		return isNew;
	}

	userLoggedDetails(username) {
		let usersDatabase = window.Sistema.getItemToLocalStorage('usersDatabase')
		let user = usersDatabase.find(user => user.userName === username);
		let userLogged = {
			logged: true,
			isAdmin: user.admin,
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.userName,
			budget: user.userBudget,
			pwd: user.userPassword,
			userID: user.id,
			miles: user.milesAmount,
		};
		localStorage.setItem('userLoggedIn', JSON.stringify(userLogged));
	}

	/**
	 * Funcion para pushear data al localStorage
	 * @param {string} key Nombre de la key
	 * @param {*} value Item a pushear
	 */
	pushItemToLocalStorage(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	/**
	 * Funcion para recuperar data al localStorage
	 * @param {*} key Nombre de la key
	 * @returns Item guardado
	 */
	getItemToLocalStorage(key) {
		return JSON.parse(localStorage.getItem(key))
	}

	/**
	 * Funcion para crear las reservas.
	 * @param {*} cant Cantidad de cupos a reservar
	 * @param {*} mPayment Metodo de pago seleccionado
	 * @param {*} destID ID del destino seleccionado
	 * @param {*} userID ID del usuario que realiza la reserva
	 * @param {*} state Estado en el que se crea la reserva
	 */
	createReservation(cant, mPayment, destID, userID, state) {
		let ID = +localStorage.getItem('reservID') + 1
		let reservation = { cant: cant, mPayment: mPayment, destID: destID, userId: userID, state: state, reservID: `RESERV_ID_${ID}` }
		localStorage.setItem('reservID', ID)
		this.reservations.push(reservation)
		localStorage.setItem("reservations", JSON.stringify(this.reservations))
	}

	modifyReserv(obj) {
       this.reservations = []
		obj.forEach(element => {
         this.reservations.push(element)
		});
	}
	isLogged() {
		const userLogged = JSON.parse(localStorage.getItem("userLoggedIn"));
		document.addEventListener("DOMContentLoaded", function checkAccess() {
			if (!userLogged.logged) {
				alert("Por favor, inicie sesión para acceder a esta página.");
				window.location.href = "index.html"
			}
		});
	}

	isAdminLogged() {
		const currentUserLogged = JSON.parse(localStorage.getItem("userLoggedIn"));
		document.addEventListener("DOMContentLoaded", function checkAdminAccess() {
			if (!currentUserLogged.logged) {
				alert("Por favor, inicie sesión para acceder a esta página.");
				window.location.href = "index.html"
				return
			}
			if (!currentUserLogged.isAdmin) {
				alert("Usted no tiene permisos de administrador. Será redirigido a la página principal.");
				window.location.href = "clientSite.html"
			}
		});
	}
}

document.addEventListener("DOMContentLoaded", function () {
	if (!localStorage.getItem("usersDatabase")) {
		localStorage.setItem("usersDatabase", JSON.stringify(window.Sistema.users));
	}
});

window.Sistema = new Sistema()
window.Sistema.preLoadData()
if (!localStorage.getItem('destinos')) window.Sistema.pushItemToLocalStorage('destinos', window.Sistema.preLoadDest)
if (!localStorage.getItem('reservations')) {
	console.log('Entro a precargar destinos')
	window.Sistema.createReservation("1", "efectivo", "DEST_ID_1", 8, 'Pendiente')
	window.Sistema.createReservation("4", "millas", "DEST_ID_4", 8, 'Aprobada')
	window.Sistema.createReservation("3", "efectivo", "DEST_ID_3", 9, 'Pendiente')
	window.Sistema.createReservation("1", "efectivo", "DEST_ID_2", 10, 'Aprobada')
	window.Sistema.createReservation("1", "millas", "DEST_ID_4", 7, 'Pendiente')
}