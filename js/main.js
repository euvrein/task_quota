const
    work_time_0730 = [
        "07:30 AM",
        "08:00 AM",
        "08:30 AM",
        "08:30 AM",
        "09:00 AM",
        "09:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "BREAK TIME",
        "01:00 PM",
        "01:30 PM",
        "02:00 PM",
        "02:30 PM",
        "03:00 PM",
        "03:30 PM",
        "04:00 PM",
        "04:30 PM",
        "05:00 PM"
    ],
    work_time_0800 = [
        "08:00 AM",
        "08:30 AM",
        "09:00 AM",
        "09:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "BREAK TIME",
        "01:00 PM",
        "01:30 PM",
        "02:00 PM",
        "02:30 PM",
        "03:00 PM",
        "03:30 PM",
        "04:00 PM",
        "04:30 PM",
        "05:00 PM"
    ],
    work_time_0830 = [
        "08:30 AM",
        "09:00 AM",
        "09:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "BREAK TIME",
        "01:00 PM",
        "01:30 PM",
        "02:00 PM",
        "02:30 PM",
        "03:00 PM",
        "03:30 PM",
        "04:00 PM",
        "04:30 PM",
        "05:00 PM"
    ];


var work_time = work_time_0830;


$( document ).ready(function() {
    display_warning();
    refresh_data()
});


$(document).on('change', function() {
    switch($('#start_time option:selected').val()){
        case "0730":
            work_time = work_time_0730;
            break;
        case "0800":
            work_time = work_time_0800;
            break;
        case "0830":
        work_time = work_time_0830;
            break;
        default:
            work_time = work_time_0830;
    }
    refresh_data()
});


function refresh_data(){
    reset_table();
    display_time_table ();
};


function display_warning(){
    var week_ago = dayjs().subtract(7, 'day').format('DD/MM/YYYY');
    var three_months_ago = dayjs().subtract(3, 'month').format('DD/MM/YYYY');
    var year_ago = dayjs().subtract(1, 'year').format('DD/MM/YYYY');
    
    $('#warning').append(
        '<strong>' + week_ago + '</strong> was seven days ago <br />' +
        '<strong>' + three_months_ago + '</strong> was three months ago <br />' +
        '<strong>' + year_ago + '</strong> was a year ago<br />' 
    )
};


function reset_table(){
    $('#timetable').empty();
    $('#comment').empty();
};


function display_time_table (){
    var allocated_task =  $("#allocated_task").val();
    allocated_task = parseInt(allocated_task);

    var predicted_additional_task = $("#predicted_additional_task").val();
    predicted_additional_task = parseInt(predicted_additional_task);
    predicted_additional_task += allocated_task;

    var work_division = work_time.length-2;

    var estimated_task_to_finish_additional = Math.ceil(predicted_additional_task / work_division);

    for (i = 0; i < work_time.length; i++) {
        if(allocated_task < 0){
            allocated_task = 0;
        }
        if(predicted_additional_task < 0){
            predicted_additional_task = 0;
        }
        
        if(work_time[i]!="BREAK TIME"){
            $('#timetable').append(
                '<tr>'+
                    '<td>'+work_time[i]+'</td>'+
                    '<td>'+allocated_task+'</td>'+
                    '<td>'+(predicted_additional_task)+'</td>'+
                '</tr>'
            )
                allocated_task -= estimated_task_to_finish_additional;
                predicted_additional_task -= estimated_task_to_finish_additional;
        } else {
            $('#timetable').append(
                '<tr>'+
                    '<td colspan=3 class="text-danger text-center text-white bg-danger"></td>'+
                '</tr>'
            )
        }
    };
    $('#comment').append(
        '<p>'+
            'You need to do atleast <strong>'+
                estimated_task_to_finish_additional+
            ' tasks every thirty minutes</strong> to finish your work on time'+
        '</p>'
    )
};