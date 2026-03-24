// Object to store calculator data
let calculatorData = {
    bill: 0,
    tip: 0,
    people: 0
};

//Variables of tip amount and total amount
let tipAmount = 0;
let totalPerPerson = 0;
let tipPerPerson = 0;

// Function to store input values (bill and people)
function declareInputValues() {
    $(".calc-input").on("blur", function () {
        let key = this.id;
        let rawValue = parseFloat($(this).val()) || 0;

        let value = Math.max(0, rawValue);
        if (rawValue < 0) $(this).val(0);
        calculatorData[key] = value;

        // Only trigger error styling if people is 0
        if (key === "people" && value === 0) {
           $("#people").addClass("error");
            $(".error-text").removeClass("hidden");
            setTimeout(() => {
                $("#people").removeClass("error");
                $(".error-text").addClass("hidden");
            }, 2000); 
        }
        calculateTotalAmount();
    });

    // Function to handle tip percentage (buttons and custom tip)
    handleTipChange = (e) => {
        const el = e.target;
        const key = "tip";
        let value;

        if ($(el).hasClass("tip")) 
            {
                value = parseFloat($(el).text()) || 0;;
                $(".tip").removeClass("selected"); 
                $(el).addClass("selected");        
                $("#custom-tip").val("");
            } 
            else if (el.id === "custom-tip") 
            {
                let rawValue = parseFloat($(el).val()) || 0;
                value = Math.max(0, rawValue); 
                if (rawValue < 0) $(el).val(value);
                $(".tip").removeClass("selected");
            }
        calculatorData[key] = value;
        calculateTotalAmount();
        }
        $("#custom-tip").on("input", handleTipChange);
        $(".tip").on("click", handleTipChange);
    }
    
declareInputValues();

// Function to calculate tip and total amount
function calculateTipAmount() {
    tipAmount = (calculatorData.bill  * calculatorData.tip) / 100;
    return tipAmount;
}

function calculateTotalAmount() {
    if (calculatorData.people === 0) {
        // Optional: Reset the display to $0.00
        $("#tip-amount").text("$0.00");
        $("#total-amount").text("$0.00");
        return; 
    }

    // Calculate tip and total amount per person
    const totalTip = calculateTipAmount();
    const tipPerPerson = totalTip / calculatorData.people;
    totalPerPerson = (calculatorData.bill + totalTip) / calculatorData.people;
    
    // Update the display
    $("#tip-amount").text(`$${tipPerPerson.toFixed(2)}`);
    $("#total-amount").text(`$${totalPerPerson.toFixed(2)}`);

    return totalPerPerson, tipPerPerson; 
}

// Function to reset the calculator
function resetCalculator() {
    calculatorData = {
        bill: 0,
        tip: 0,
        people: 0
    };
    calculateTotalAmount();

    $("#custom-tip").val("");
    $(".tip").removeClass("selected");
    $("#people").val(0);
    $("#bill").val(0);
}

$("#reset-btn").on("click", resetCalculator);




