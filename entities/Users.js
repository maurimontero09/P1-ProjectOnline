let IDauto = 0;

class User {
  constructor(
    admin,
    firstName,
    lastName,
    userName,
    userPassword,
    userCreditCard,
    userCVC,
    userBudget,
    milesAmount
  ) {
    this.admin = admin;
    IDauto++;
    this.id = IDauto;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.userPassword = userPassword;
    this.userCreditCard = userCreditCard;
    this.userCVC = userCVC;
    this.userBudget = userBudget;
    this.milesAmount = milesAmount;
    this.reservations = [];
  }
}
