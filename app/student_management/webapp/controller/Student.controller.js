sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller,MessageToast,MessageBox) => {
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
        //  var id= this.getView().byId("student_id").getValue(); 
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
          // var id=this.getView().byId("student_id_up").getValue(); 
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
          //  oContext.setProperty("ID", id);
           oContext.setProperty("firstName", firstName);
           oContext.setProperty("lastName", lastName); 
           oContext.setProperty("email", email); 
           oContext.setProperty("age", age); 
           oContext.setProperty("createdAt", createdAt); 
           this.onCloseDialog_update();   
        },
        onCloseDialog(){
          // this.getView().byId("student_id").setValue(""); 
          this.getView().byId("firstName").setValue(""); 
          this.getView().byId("lastName").setValue(""); 
          this.getView().byId("email").setValue(""); 
          this.getView().byId("age").setValue(""); 
          this.getView().byId("createdAt").setValue(""); 
          this.byId("createDialog").close();
        },
          onCloseDialog_update(){
          // this.getView().byId("student_id_up").setValue("ID"); 
          this.getView().byId("firstName_up").setValue("firstName"); 
          this.getView().byId("lastName_up").setValue("lastName"); 
          this.getView().byId("email_up").setValue("email"); 
          this.getView().byId("age_up").setValue("age"); 
          this.getView().byId("createdAt_up").setValue("createdAt"); 
          this.byId("updateDialog").close();
        },
      // onDeleteStudent: function () {

      //   const oTable = this.byId("student_table");
      //   const iIndex = oTable.getSelectedIndex();

      //   if (iIndex === -1) {
      //     sap.m.MessageToast.show("Please select a row to delete");
      //     return;
      //   }

      //   const oCtx = oTable.getContextByIndex(iIndex);

      //   // Confirmation dialog
      //   sap.m.MessageBox.confirm(
      //     "Are you sure you want to delete this student?",
      //     {
      //       title: "Confirm Delete",
      //       actions: [
      //         sap.m.MessageBox.Action.YES,
      //         sap.m.MessageBox.Action.NO
      //       ],
      //       onClose: function (sAction) {
      //         if (sAction === sap.m.MessageBox.Action.YES) {
      //           // OData V4 delete
      //           oCtx.delete()
      //             .then(function () {
      //               sap.m.MessageToast.show("Student deleted successfully");
      //             })
      //             .catch(function (err) {
      //               sap.m.MessageBox.error("Delete failed");
      //               console.error(err);
      //             });
      //         }
      //       }
      //     }
      //   );
      // }
      onDeleteStudents: function () {
        const oTable = this.byId("student_table");
        const aSelectedIndices = oTable.getSelectedIndices();
        if (aSelectedIndices.length === 0) {
          sap.m.MessageToast.show("Please select records to delete");
          return;
        }
        sap.m.MessageBox.confirm(
          "Delete selected students?",
          {
            title: "Confirm Delete",
            actions: [
              sap.m.MessageBox.Action.YES,
              sap.m.MessageBox.Action.NO
            ],
            onClose: (sAction) => {
              if (sAction === sap.m.MessageBox.Action.YES) {
                {
                  for (let i = aSelectedIndices.length - 1; i >= 0; i--) {
                    const oCtx = oTable.getContextByIndex(aSelectedIndices[i]);
                    if (oCtx) {
                      oCtx.delete();
                    }
                  }
                  oTable.clearSelection();
                }
              }
            }
          }
        );

      }
	});
});