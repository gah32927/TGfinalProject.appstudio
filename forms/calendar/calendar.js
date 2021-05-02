var source = []
newEvents = []
deletedEvents = []
var dateFormat = "yyyy-MM-dd"

function Main() {
  StartScheduler()
}

function StartScheduler() {
  $("#Scheduler1").jqxScheduler({
    editDialogCreate: function(dialog, fields, editAppointment) {
      //fields.repeatContainer.hide();
      fields.statusContainer.hide();
      fields.timeZoneContainer.hide();
      fields.colorContainer.hide();
      fields.allDay.hide();

      fields.subjectLabel.html("Subject");
      fields.locationLabel.html("Location");
      //fields.location.hide();
      fields.fromLabel.html("Start");
      fields.toLabel.html("End");
      //fields.resourceLabel.html("calendar");
    },

    appointmentDataFields: {
      // fields to be set by user when scheduling new event
      from: "start_date",
      to: "end_date",
      recurrencePattern: "recurrence",
      description: "description",
      subject: "subject",
      location: "location",
      background: "background",
      id: "appointment_id"
    },

    views: [
      'dayView',
      'weekView',
      'monthView',
      'agendaView'
    ]
  })


  //prepare the data for application to the control
  source = [];
  source = {
    dataType: "json",
    dataFields: [{
      name: "start_date",
      type: "date",
      format: dateFormat
    }, {
      name: "end_date",
      type: "date",
      format: dateFormat
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
      name: "background",
      type: "string"
    }, {
      name: "appointment_id",
      type: "string"
    }, ],
    id: "appointment_id",
    url: "https://ormond.creighton.edu/courses/375/Groups/Group-A6/data.php"
  };

  // create adapter/pointer that holds the data
  var adapter = new $.jqx.dataAdapter(source);
  $("#Scheduler1").jqxScheduler({
    source: adapter,
    editDialogDateTimeFormatString: 'yyyy-MM-dd HH:mm',
    editDialogDateFormatString: 'yyyy-MM-dd',
  });

  $("#Scheduler1").jqxScheduler({
    date: new $.jqx.date('todayDate'),
  });

  //$("#Scheduler1").jqxScheduler("ensureAppointmentVisible", appointment.id);

  // create the calender
  res = {
    colorScheme: "scheme05",
    dataField: "calendar",
    source: new $.jqx.dataAdapter(source),
  };

  $("#Scheduler1").jqxScheduler({
    resources: res
  });

  // default show in month view
  $("#Scheduler1").jqxScheduler({
    view: "monthView"
  });

  //ADD appointment to database
  $("#Scheduler1").on('appointmentAdd', function(event) {
    var args = event.args;
    var appointment = args.appointment;
    console.log(appointment);
    //window.alert(appointment);

    var STARTDATE = appointment.from;
    var ENDDATE = appointment.to;
    var RECURRENCE = appointment.recurrencePattern;
    var DESCRIPTION = appointment.description;
    var SUBJECT = appointment.subject;
    var LOCATION = appointment.location;
    var COLOR = appointment.background;
    var ID = appointment.id;

    var startDate = STARTDATE.toString();
    var endDate = ENDDATE.toString();

    if (RECURRENCE === null) {
      var recurrence = RECURRENCE
    } else {
      var recurrence = RECURRENCE.toString();
    }
    
    if (COLOR === null) {
      var color = COLOR
    } else {
      var color = COLOR.toString();
    }

    $.ajax({
      type: "POST",
      url: "https://ormond.creighton.edu/courses/375/Groups/Group-A6/dataAdd.php",
      data: {
        STARTDATE: startDate,
        ENDDATE: endDate,
        RECURRENCE: recurrence,
        DESCRIPTION: DESCRIPTION,
        SUBJECT: SUBJECT,
        LOCATION: LOCATION,
        COLOR: color,
        ID: ID
      },
      //cache: false,
      success: function(data) {
        alert('Event added');
      },
      error: function(e) {
        console.log(e.message);
      }
    });

  });

  
  //UPDATE existing appointment in database
  $("#Scheduler1").on('appointmentChange', function(event) {
    var args = event.args;
    var appointment = args.appointment;
    console.log(appointment);
    //window.alert(appointment);

    var STARTDATE = appointment.from;
    var ENDDATE = appointment.to;
    var RECURRENCE = appointment.recurrencePattern;
    var DESCRIPTION = appointment.description;
    var SUBJECT = appointment.subject;
    var LOCATION = appointment.location;
    var COLOR = appointment.background;
    var ID = appointment.id;

    var startDate = STARTDATE.toString();
    var endDate = ENDDATE.toString();

    if (RECURRENCE === null) {
      var recurrence = RECURRENCE
    } else {
      var recurrence = RECURRENCE.toString();
    }
    
    if (COLOR === null) {
      var color = COLOR
    } else {
      var color = COLOR.toString();
    }

    $.ajax({
      type: "POST",
      url: "https://ormond.creighton.edu/courses/375/Groups/Group-A6/dataUpdate.php",
      data: {
        STARTDATE: startDate,
        ENDDATE: endDate,
        RECURRENCE: recurrence,
        DESCRIPTION: DESCRIPTION,
        SUBJECT: SUBJECT,
        LOCATION: LOCATION,
        COLOR: color,
        ID: ID
      },
      //cache: false,
      success: function(data) {
        alert('Event updated');
      },
      error: function(e) {
        console.log(e.message);
      }
    });

  });
  
    //DELETE appointment from database
  $("#Scheduler1").on('appointmentDelete', function(event) {
    var args = event.args;
    var appointment = args.appointment;
    console.log(appointment);
    //window.alert(appointment);

    var STARTDATE = appointment.from;
    var ENDDATE = appointment.to;
    var RECURRENCE = appointment.recurrencePattern;
    var DESCRIPTION = appointment.description;
    var SUBJECT = appointment.subject;
    var LOCATION = appointment.location;
    var COLOR = appointment.background;
    var ID = appointment.id;

    var startDate = STARTDATE.toString();
    var endDate = ENDDATE.toString();

    if (RECURRENCE === null) {
      var recurrence = RECURRENCE
    } else {
      var recurrence = RECURRENCE.toString();
    }
    
    if (COLOR === null) {
      var color = COLOR
    } else {
      var color = COLOR.toString();
    }

    $.ajax({
      type: "POST",
      url: "https://ormond.creighton.edu/courses/375/Groups/Group-A6/dataDelete.php",
      data: {
        STARTDATE: startDate,
        ENDDATE: endDate,
        RECURRENCE: recurrence,
        DESCRIPTION: DESCRIPTION,
        SUBJECT: SUBJECT,
        LOCATION: LOCATION,
        COLOR: color,
        ID: ID
      },
      //cache: false,
      success: function(data) {
        alert('Event deleted');
      },
      error: function(e) {
        console.log(e.message);
      }
    });

  });

}