'use strict';

module.exports = function(Expense) {

  // Expense.disableRemoteMethod("create", true);
  Expense.disableRemoteMethod("find ", true);
  Expense.disableRemoteMethod("delete", true);
  Expense.disableRemoteMethod("count ", true);
  Expense.disableRemoteMethod("findOne", true);
  Expense.disableRemoteMethod("exists", true);
  Expense.disableRemoteMethod("update", true);
  Expense.disableRemoteMethod("findById", true);
  Expense.disableRemoteMethod("deleteById", true);
  Expense.disableRemoteMethod("existsById", true);
  Expense.disableRemoteMethod("replaceById", true);
  Expense.disableRemoteMethod("deleteById", true);
  Expense.disableRemoteMethod("patchAttributes", true);
  Expense.disableRemoteMethod("findCreateStream", true);
  Expense.disableRemoteMethod("createChangeStream", true);
  Expense.disableRemoteMethod("replaceOrCreate", true);
  Expense.disableRemoteMethod("upsertWithWhere", true);


};
