var source = []
newEvents = []
deletedEvents = []

function Main() {
  StartScheduler()
}

function StartScheduler() {
  $("#Scheduler1").jqxScheduler({
    editDialogCreate: function(dialog, fields, editAppointment) {
      //fields.repeatContainer.hide();
      fields.statusContainer.hide();
      fields.timeZoneContainer.hide();
      //fields.colorContainer.hide();

      fields.subjectLabel.html("Subject");
      fields.locationLabel.html("Location");
      //fields.location.hide();
      fields.fromLabel.html("Start");
      fields.toLabel.html("End");
      //fields.resourceLabel.html("calendar");
    },

    appointmentDataFields: {
      // fields to be set by user when scheduling new event
      id: "event_id",
      from: "start_date",
      to: "end_date",
      recurrencePattern: "recurrence",
      description: "description",
      subject: "subject",
      location: "location",
      color: "color"
    },

    views: [
      'dayView',
      'weekView',
      'monthView',
      'agendaView'
    ]
  })


  //prepare the data for application to the control
  // requires appts be in array
  source = [];
  source = {
    dataType: "json",
    dataFields: [{
      name: "event_id",
      type: "string"
    }, {
      name: "start_date",
      type: "date",
      //format: "yyyy-MM-dd"
    }, {
      name: "end_date",
      type: "date",
      //format: "yyyy-MM-dd"
    }, {
      name: "recurrence",
      type: "string"
    }, {
      name: "description",
      type: "string"
    }, {
      name: "subject",
      type: "string"
    }, {
      name: "location",
      type: "string"
    }, {
      name: "color",
      type: "string"
    }, ],
    id: "id",
    url: "https://ormond.creighton.edu/courses/375/Groups/Group-A6/data.php"
  };

  // create adapter/pointer that holds the data
  var adapter = new $.jqx.dataAdapter(source);
  $("#Scheduler1").jqxScheduler({
    source: adapter,
    editDialogDateTimeFormatString: 'yyyy-MM-dd HH:mm',
    editDialogDateFormatString: 'yyyy-MM-dd',
  });

  // not sure what this is for - 
  //datum1 = new $.jqx.date(2021, 4, 10, 0, 0, 0);
  //$("#Scheduler1").jqxScheduler({
  //Date: datum1
  //});

  $("#Scheduler1").jqxScheduler({
    date: new $.jqx.date(2021, 4, 1, 0, 0, 0)
  });

  //$("#Scheduler1").jqxScheduler("ensureAppointmentVisible", appointment.id);

  // create the calender
  res = {
    colorScheme: "scheme05",
    dataField: "calendar",
    source: new $.jqx.dataAdapter(source)
  };

  $("#Scheduler1").jqxScheduler({
    resources: res
  });

  // add new one to calendar - need to add and also add to an ongoing array
  //$("#Scheduler1").jqxScheduler("addAppointment", newAppointment);
  //newEvents.push(newAppointment)
  //console.log(`*** The new appt you added is ${newEvents[newEvents.length-1]}`)

  // code to delete an event
  //$("#Scheduler1").jqxScheduler('deleteAppointment', appointmentId);
  // code to get selected event
  //var selection = $("#Scheduler1").jqxScheduler("getSelection");

  // default show in month view
  $("#Scheduler1").jqxScheduler({
    view: "monthView"
  });

  $("#Scheduler1").on('appointmentAdd', function(event) {
    var args = event.args;
    var appointment = args.appointment;
    console.log(appointment);
    //window.alert(appointment);

    //var ID = appointment.event_id;
    var STARTDATE = appointment.start_date;
    var ENDDATE = appointment.end_date;
    var RECURRENCE = appointment.recurrence;
    var DESCRIPTION = appointment.description;
    var SUBJECT = appointment.subject;
    var LOCATION = appointment.location;
    var COLOR = appointment.color;

    var startDate = STARTDATE//JSON.stringify(STARTDATE);
    var endDate = ENDDATE//JSON.stringify(ENDDATE);
    
    $.ajax({
      type: "POST",
      //dataType: "json",
      url: "https://ormond.creighton.edu/courses/375/Groups/Group-A6/dataAdd.php",
      data: {
        //ID: ID,
        STARTDATE: startDate,
        ENDDATE: endDate,
        RECURRENCE: RECURRENCE,
        DESCRIPTION: DESCRIPTION,
        SUBJECT: SUBJECT,
        LOCATION: LOCATION,
        COLOR: COLOR
      },
      //cache: false,
      success: function(data) {
        alert('Items added');
      },
      error: function(e) {
        console.log(e.message);
      }
    });

  });
}



/*
btnSave.onclick=function(){
  let numOldAppts = 0
  
  let appointmentsGet = $("#Scheduler1").jqxScheduler("getDataAppointments")
  
  let numNewAppts = appointmentsGet.length - numOldAppts
  console.log(`The number of new appts is: ${numNewAppts}`)
  
  appointmentsGet.reverse()
  console.log("REVERSE: " + JSON.stringify(appointmentsGet,null,0))
  
  for (i = 0; i <= numNewAppts - 1; i++)
    
}
*/