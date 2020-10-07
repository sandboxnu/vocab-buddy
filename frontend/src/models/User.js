export class User {
  /** @type {String} */
  id;

  /** @type { String } */
  name;

  /** @type { AccountType } */
  accountType;

  constructor(id, name, accountType) {
    this.id = id;
    this.name = name;
    this.accountType = accountType;
  }

  get isStudent() {
    return this.accountType === AccountType.student;
  }
}

export const AccountType = {
  researcher: "RESEARCHER",
  student: "STUDENT",
};
