var currentStep = 1;
var updateProgressBar;
var days;

function displayStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= 5) {
        $(".step-" + currentStep).hide();
        $(".step-" + stepNumber).show();
        currentStep = stepNumber;
        updateProgressBar();
    }
}
function days_between(date1, date2) {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(new Date(date1) - new Date(date2));

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);

}
$(document).ready(function () {
    $('#multi-step-form').find('.step').slice(1).hide();
    $(".next-step").click(function () {
        var inputs = document.getElementsByClassName("steps");
        for (let element of inputs) {
            switch(currentStep){
                       case 1:
                    if(element.classList.contains("step1"))
                        if (!element.reportValidity())
                        return;
                 break;
                case 2:
                    if(element.classList.contains("step2")){
                        if (!element.reportValidity())
                            return;
                        var dates = document.getElementsByClassName("step2");
                        if (dates[0].value > dates[1].value){
                            alert("Конечная дата не может быть меньше начальной");
                            return;
                        }
                        days = days_between(dates[0].value, dates[1].value);  
                        var boat_count = document.getElementById("boat_count");
                        if(days>4){
                              boat_count.setAttribute("min", 2)
                            boat_count.setAttribute("value", 2)
                        }
                        else{
                            boat_count.setAttribute("min", 1)
                            boat_count.setAttribute("value", 1)
                        }
                        
                        boat_count.setAttribute("max", days)
                        var people_count = document.getElementById("people_count").value;
                        document.getElementById("rod_count").setAttribute("max", people_count);
                    }                     
                 break;
                     case 3:
                    if(element.classList.contains("step3"))
                        if (!element.reportValidity())
                        return;
                 break;        
                             case 4:
                    if(element.classList.contains("step4"))
                        if (!element.reportValidity())
                        return;
                 break;
                             case 5:
                    if(element.classList.contains("step5"))
                        if (!element.reportValidity())
                        return;
                 break;
        }
        }
        if (currentStep < 5) {
            $(".step-" + currentStep).addClass("animate__animated animate__fadeOutLeft");
            currentStep++;
            setTimeout(function () {
                $(".step").removeClass("animate__animated animate__fadeOutLeft").hide();
                $(".step-" + currentStep).show().addClass("animate__animated animate__fadeInRight");
                updateProgressBar();
            }, 500);
        }
    });

    $(".prev-step").click(function () {
        if (currentStep > 1) {
            $(".step-" + currentStep).addClass("animate__animated animate__fadeOutRight");
            currentStep--;
            setTimeout(function () {
                $(".step").removeClass("animate__animated animate__fadeOutRight").hide();
                $(".step-" + currentStep).show().addClass("animate__animated animate__fadeInLeft");
                updateProgressBar();
            }, 500);
        }
    });

    updateProgressBar = function () {
        var progressPercentage = ((currentStep - 1) / 4) * 100;
        $(".progress-bar").css("width", progressPercentage + "%");
    }
});
