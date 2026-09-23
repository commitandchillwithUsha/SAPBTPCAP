sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller,MessageToast) => {
    "use strict";

    return Controller.extend("com.studentmanagement.studentmanagement.controller.Student", {
        onInit() {
        },
        // onCreate: function (evt) {
		// 	MessageToast.show(evt.getSource().getId() + " Pressed");
		// },
        // "this" has to be the controller instance of a controller extending module "sap/ui/core/mvc/Controller"
        async onCreate() {
	        this.oDialog ??= await this.loadFragment({
		    name: "com.studentmanagement.studentmanagement.view.createDialog"
	     });
	        this.oDialog.open();
        },
         async onUpdate() {
	        this.pDialog ??= await this.loadFragment({
		    name: "com.studentmanagement.studentmanagement.view.updateDialog"
	     });
          var selectedRow =this.getView().byId("student_table").getSelectedIndex();
            if (selectedRow < 0) {
             sap.m.MessageToast.show("Please select a student");
             return;
             }
          var studentid_up=this.getView().byId("student_table").getRows()[selectedRow].getBindingContext().getObject().ID;
          var firstName_up=this.getView().byId("student_table").getRows()[selectedRow].getBindingContext().getObject().firstName;
          var lastName_up=this.getView().byId("student_table").getRows()[selectedRow].getBindingContext().getObject().lastName;
          var email_up=this.getView().byId("student_table").getRows()[selectedRow].getBindingContext().getObject().email;
          var age_up=this.getView().byId("student_table").getRows()[selectedRow].getBindingContext().getObject().age;
          var createdAt_up=this.getView().byId("student_table").getRows()[selectedRow].getBindingContext().getObject().createdAt;
          this.getView().byId("student_id_up").setValue(studentid_up); 
          this.getView().byId("firstName_up").setValue(firstName_up); 
          this.getView().byId("lastName_up").setValue(lastName_up); 
          this.getView().byId("email_up").setValue(email_up); 
          this.getView().byId("age_up").setValue(age_up); 
          this.getView().byId("createdAt_up").setValue(createdAt_up); 
	      this.pDialog.open();
        },
        onSaveDialog(){
         var id= this.getView().byId("student_id").getValue(); 
         var firstName= this.getView().byId("firstName").getValue(); 
         var lastName= this.getView().byId("lastName").getValue(); 
         var email= this.getView().byId("email").getValue(); 
         var age= this.getView().byId("age").getValue(); 
         var createdAt= this.getView().byId("createdAt").getValue(); 
         var payload = {
             ID: id,
            age: age,
            createdAt: createdAt,
            email: email,
            firstName: firstName,
            lastName: lastName  };
        const oTable = this.byId("student_table");
        const oBinding = oTable.getBinding("rows");
        oBinding.create(
        payload
        ); 
        this.onCloseDialog();             
        },
        onUpdateDialog(){
          var id=this.getView().byId("student_id_up").getValue(); 
          var firstName=this.getView().byId("firstName_up").getValue(); 
          var lastName=this.getView().byId("lastName_up").getValue(); 
          var email=this.getView().byId("email_up").getValue(); 
          var age=this.getView().byId("age_up").getValue(); 
          var createdAt=this.getView().byId("createdAt_up").getValue(); 
          var oTable = this.byId("student_table");         
          var oContext = oTable.getContextByIndex(iSelectedIndex);
          var iSelectedIndex = oTable.getSelectedIndex();
             if (iSelectedIndex < 0) {
             sap.m.MessageToast.show("Please select a student");
             return;
             }
        //   // Update properties
           oContext.setProperty("ID", id);
           oContext.setProperty("firstName", firstName);
           oContext.setProperty("lastName", lastName); 
           oContext.setProperty("email", email); 
           oContext.setProperty("age", age); 
           oContext.setProperty("createdAt", createdAt); 
           this.onCloseDialog_update();   
        },
        onCloseDialog(){
          this.getView().byId("student_id").setValue(""); 
          this.getView().byId("firstName").setValue(""); 
          this.getView().byId("lastName").setValue(""); 
          this.getView().byId("email").setValue(""); 
          this.getView().byId("age").setValue(""); 
          this.getView().byId("createdAt").setValue(""); 
          this.byId("createDialog").close();
        },
          onCloseDialog_update(){
          this.getView().byId("student_id_up").setValue("ID"); 
          this.getView().byId("firstName_up").setValue("firstName"); 
          this.getView().byId("lastName_up").setValue("lastName"); 
          this.getView().byId("email_up").setValue("email"); 
          this.getView().byId("age_up").setValue("age"); 
          this.getView().byId("createdAt_up").setValue("createdAt"); 
          this.byId("updateDialog").close();
        }
	});
});