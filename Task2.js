


let page = document.body.id;
let barId = 1, updateSr = 0;

let tableBody, updateBtn, deleteBtn, add_link;
let amountInput, typeInput, timeInput, addBtn, summaryInput, descInput;
let typeSelect, startRangeVal, endRangeVal, showFilterResult, filterTableBody;

let UpdateSummaryInput, UpdateDescInput, UpdateAmmountInput, UpdateTypeInput, UpdateTimeInput;
let update_btn;

if (page == 'homePage') {
    console.log(page)
    tableBody = document.getElementById('table_body');

    add_link = document.getElementById('add_link');
    ShowExpenceList();
    updateBtn = document.getElementById('btn_update');
    deleteBtn = document.getElementById('btn_delete');
    //console.log(updateBtn)

}
else if (page == 'addExpensePage') {
    summaryInput = document.getElementById('summaryInput');
    descInput = document.getElementById('descInput');
    amountInput = document.getElementById('ammountInput');
    typeInput = document.getElementById('typeInput');
    timeInput = document.getElementById('timeInput');
    addBtn = document.getElementById('add_btn');
    console.log("Expense Page")
    let date = new Date();
    timeInput.value = date;
}
else if (page == 'FilterPage') {
    typeSelect = document.getElementById('typeSelect');
    startRangeVal = document.getElementById('startRangeVal');
    endRangeVal = document.getElementById('endRangeVal');
    showFilterResult = document.getElementById('showFilterResult');
    filterTableBody = document.getElementById('table_body_filter');

    let summaryText = localStorage.getItem('summaryText');
    let descText = localStorage.getItem('descText');
    let amountText = localStorage.getItem('amountText');
    let timeText = localStorage.getItem('timeText');
    let typeText = localStorage.getItem('typeText');

    let summaryTextArr = JSON.parse(summaryText);
    let descTextArr = JSON.parse(descText);
    let amountTextArr = JSON.parse(amountText);
    let timeTextArr = JSON.parse(timeText);
    let typeTextArr = JSON.parse(typeText);


    let innerhtml = '';
    if (typeTextArr.length != 0) {
        typeTextArrUnique = [...new Set(typeTextArr)]

        typeTextArrUnique.forEach((element, index) => {
            innerhtml += `
              <option value="${element}">${element}</option>
              `
        });
        typeSelect.innerHTML = innerhtml;
    }
    else {
        innerhtml = `
        <p> Their is no type to shox </p>
        `
        typeSelect.innerHTML = innerhtml;
    }


    showFilterResult.addEventListener('click', function (e) {
        let htmlStr = '';
        // console.log(typeSelect.value)
        if (summaryTextArr.length != 0) {
            console.log("Inside if")
            summaryTextArr.forEach((element, index) => {
                // console.log(typeSelect.value)
                // console.log(startRangeVal.value)
                // console.log(endRangeVal.value)
                // console.log(amountTextArr[index])
                // if((amountTextArr[index] >= startRangeVal.value))
                // {
                //     console.log(typeof amountTextArr[index])
                //     console.log(typeof endRangeVal.value)
                // }
                // if(parseInt(amountTextArr[index]) <= parseInt(endRangeVal.value))
                // {
                //     console.log("True again")
                // }
                // if(typeTextArr[index] == typeSelect.value)
                // {
                //     console.log("True again again")
                // }

                if ((typeTextArr[index] === typeSelect.value) && (parseInt(amountTextArr[index]) >= parseInt(startRangeVal.value)) && (parseInt(amountTextArr[index]) <= parseInt(endRangeVal.value))) {
                    console.log("true")

                    htmlStr +=
                        `
                        <tr class="data_row">
                        <td class="Sr">${index + 1}</td>
                        <td class="expence">${element}</td>
                        <td class="desc">${descTextArr[index]}</td>
                        <td class="price">${amountTextArr[index]}</td>
                        <td class="type">${typeTextArr[index]}</td>
                        <td class="date">${timeTextArr[index]}</td>
                        </tr>
            
                        `
                }

            });
            filterTableBody.innerHTML = htmlStr;

        }

    });
}
else if (page == 'graphPage') {

    let selectMonth = document.getElementById('selectMonth');
    let selectYear = document.getElementById('selectYear');
    let timeText = localStorage.getItem('timeText');
    let typeText = localStorage.getItem('typeText');
    let amountText = localStorage.getItem('amountText');
    let typeTextArr = JSON.parse(typeText);
    let timeTextArr = JSON.parse(timeText);
    let amountTextArr = JSON.parse(amountText);
    let mychart = document.getElementById('mychart').getContext('2d');

    let typearr = [];
    let amountarr = [];
    let barChart;
    //showGraph(typearr, amountarr, barChart)
    showGraph(typearr, amountarr)


    selectMonth.addEventListener('change', function () {
        typearr = [];
        amountarr = [];
        console.log("Month Select " + selectMonth.value);
        console.log("Year Select " + selectYear.value);
        if (selectMonth.value != 'SelectMonth') {
            if (selectYear.value != 'SelectYear') {
                console.log("Both Month and year Selected");

                timeTextArr.forEach((element, index) => {
                    let date1 = new Date(element);
                    let month = date1.getMonth();
                    let year = date1.getFullYear();
                    if ((selectMonth.value == month) && (selectYear.value == year)) {
                        console.log("Both year and month are equal");
                        typearr.push(typeTextArr[index]);
                        amountarr.push(amountTextArr[index]);
                    }

                });
            }
            else if (selectYear.value == 'SelectYear') {
                console.log('Only month is selected')
                timeTextArr.forEach((element, index) => {
                    let date1 = new Date(element);
                    let month = date1.getMonth();
                    if (selectMonth.value == month) {
                        console.log("Yes Only month is selected");
                        typearr.push(typeTextArr[index]);
                        amountarr.push(amountTextArr[index]);
                    }
                });
            }
        }
        else if (selectMonth.value == 'SelectMonth') {
            if (selectYear.value != 'SelectYear') {
                timeTextArr.forEach((element, index) => {
                    let date1 = new Date(element);
                    let year = date1.getFullYear();
                    if ((selectYear.value == year)) {
                        console.log("Both year are equal");
                        typearr.push(typeTextArr[index]);
                        amountarr.push(amountTextArr[index]);
                    }

                });
            }
        }
        console.log(typearr);
        console.log(amountarr);
        // let barChart2;
        showGraph(typearr, amountarr);

        console.log(" After Destroy chart")

    })
    selectYear.addEventListener('change', function () {
        typearr = [];
        amountarr = [];
        console.log('Change in year')
        console.log("Month Select " + selectMonth.value);
        console.log("Year Select " + selectYear.value);
        if (selectYear.value != 'SelectYear') {
            if (selectMonth.value != 'SelectMonth') {
                console.log("Both Month and year Selected");

                timeTextArr.forEach((element, index) => {
                    let date1 = new Date(element);
                    let month = date1.getMonth();
                    let year = date1.getFullYear();
                    if ((selectMonth.value == month) && (selectYear.value == year)) {
                        console.log("Both year and month are equal");
                        typearr.push(typeTextArr[index]);
                        amountarr.push(amountTextArr[index]);
                    }

                });
            }
            else if (selectMonth.value == 'SelectMonth') {
                console.log('Only month is selected')
                timeTextArr.forEach((element, index) => {
                    let date1 = new Date(element);
                    let year = date1.getFullYear();
                    if (selectYear.value == year) {
                        console.log("Yes Only month is selected");
                        typearr.push(typeTextArr[index]);
                        amountarr.push(amountTextArr[index]);
                    }
                });
            }
        }
        else if (selectYear.value == 'SelectYear') {
            if (selectMonth.value != 'SelectMonth') {
                timeTextArr.forEach((element, index) => {
                    let date1 = new Date(element);
                    let month = date1.getMonth();
                    if ((selectMonth.value == month)) {
                        console.log("Both year and month are equal");
                        typearr.push(typeTextArr[index]);
                        amountarr.push(amountTextArr[index]);
                    }

                });
            }
        }
        console.log(typearr);
        console.log(amountarr);

        let barChart1;
        showGraph(typearr, amountarr)

    })


    let innerhtml = `<option value="SelectMonth">Select Month</option>`;
    let amountSumArr = [];
    let amountSum = 0;

    // if (timeTextArr.length != 0) {
    //     typeTextArrUnique = [...new Set(typeTextArr)];


    //     typeTextArrUnique.forEach((element, index) => {
    //         typeTextArr.forEach((innerElement, innerIndex) => {
    //             if (innerElement === element) {
    //                 amountSum += parseInt(amountTextArr[innerIndex])
    //             }

    //         });
    //         amountSumArr.push(amountSum);
    //         console.log(amountSum);
    //         amountSum = 0;
    //         // if(element===typeTextArrUnique[0])
    //         // // innerhtml += `
    //         // //   <option value="${element}">${element}</option>
    //         // //   `
    //         // console.log(element);
    //     });
    //     // //typeSelect.innerHTML = innerhtml;
    // }

    if (barChart == null) {
        let htmlText = `<h4>No graph to Show Add Expense</h4>`
        document.querySelector('.chart-container').nextElementSibling.append(htmlText);
    }
}

if (page == 'addExpensePage') {
    let date = new Date();
    timeInput.value = date;
    addBtn.addEventListener('click', function (e) {
        e.preventDefault();

        let summaryText = localStorage.getItem('summaryText');
        // console.log(summaryText)
        let descText = localStorage.getItem('descText');
        let amountText = localStorage.getItem('amountText');
        let typeText = localStorage.getItem('typeText');
        let timeText = localStorage.getItem('timeText');
        let summaryTextArr = JSON.parse(summaryText);
        let descTextArr = JSON.parse(descText);
        let amountTextArr = JSON.parse(amountText);
        let typeTextArr = JSON.parse(typeText);
        let timeTextArr = JSON.parse(timeText);

        if (summaryTextArr == null) {
            console.log("Null");
            summaryTextArr = [];
            descTextArr = [];
            amountTextArr = [];
            typeTextArr = [];
            timeTextArr = [];
        }

        summaryTextArr.push(summaryInput.value);
        descTextArr.push(descInput.value);
        amountTextArr.push(amountInput.value);
        typeTextArr.push(typeInput.value);
        timeTextArr.push(timeInput.value);

        localStorage.setItem('summaryText', JSON.stringify(summaryTextArr));
        localStorage.setItem('descText', JSON.stringify(descTextArr));
        localStorage.setItem('amountText', JSON.stringify(amountTextArr));
        localStorage.setItem('typeText', JSON.stringify(typeTextArr));
        localStorage.setItem('timeText', JSON.stringify(timeTextArr));
        summaryInput.value = '';
        descInput.value = '';
        amountInput.value = '';
        typeInput.value = '';
        timeInput.value = new Date();

        //console.log(localStorage);
    })
}
if (page == 'updateExpensePage') {

    let url_string = location.href; //window.location.href
    let url = new URL(url_string);
    let sr = url.searchParams.get("val");
    console.log(sr);
    UpdateSummaryInput = document.getElementById('UpdateSummaryInput');
    UpdateDescInput = document.getElementById('UpdateDescInput');
    UpdateAmmountInput = document.getElementById('UpdateAmmountInput');
    UpdateTypeInput = document.getElementById('UpdateTypeInput');
    UpdateTimeInput = document.getElementById('UpdateTimeInput');
    update_btn = document.getElementById('update_btn');

    updateRecord(sr);
   

    update_btn.addEventListener('click',function(e){
        e.preventDefault();


        let summaryText = localStorage.getItem('summaryText');
        let descText = localStorage.getItem('descText');
        let amountText = localStorage.getItem('amountText');
        let typeText = localStorage.getItem('typeText');
        let timeText = localStorage.getItem('timeText');
    
    
    
        let summaryTextArr = JSON.parse(summaryText);
        let descTextArr = JSON.parse(descText);
        let amountTextArr = JSON.parse(amountText);
        let typeTextArr = JSON.parse(typeText);
        let timeTextArr = JSON.parse(timeText);

        console.log( amountTextArr[sr]);
        console.log( amountTextArr[sr]);
        summaryTextArr[sr]=UpdateSummaryInput.value;
        descTextArr[sr]=UpdateDescInput.value;
        amountTextArr[sr]=UpdateAmmountInput.value;
        typeTextArr[sr]=UpdateTypeInput.value;
        timeTextArr[sr]=UpdateTimeInput.value;


        localStorage.setItem('summaryText', JSON.stringify(summaryTextArr));
        localStorage.setItem('descText', JSON.stringify(descTextArr));
        localStorage.setItem('amountText', JSON.stringify(amountTextArr));
        localStorage.setItem('typeText', JSON.stringify(typeTextArr));
        localStorage.setItem('timeText', JSON.stringify(timeTextArr));

        UpdateSummaryInput.value = '';
        UpdateDescInput.value = '';
        UpdateAmmountInput.value = '';
        UpdateTypeInput.value = '';
        UpdateTimeInput.value = new Date();

    });

    // console.log($results);
}
function showGraph(x_axis_arr, y_axis_arr) {

    Chart.helpers.each(Chart.instances, function (instance) {
        instance.destroy();
    });

    let uniqueTypeArr = [...new Set(x_axis_arr)];
    let uniqueAmountArr = [];
    console.log("Unique Type array length:" + uniqueTypeArr.length);
    let sum = 0;
    let s = 0;
    while (s < uniqueTypeArr.length) {
        x_axis_arr.forEach((element, index) => {
            if (element === uniqueTypeArr[s]) {
                sum += parseInt(y_axis_arr[index]);
            }

        });
        uniqueAmountArr.push(sum);
        console.log("Sum:" + sum);
        sum = 0;
        s++;
    }
    let mychart = document.getElementById('mychart').getContext('2d');
    // console.log(x_axis_arr);
    // console.log(y_axis_arr);
    const barChart = new Chart(mychart, {

        type: 'bar',
        data: {

            labels: uniqueTypeArr,
            datasets: [{
                label: 'Expense Summaries',
                data: uniqueAmountArr,
                backgroundColor: [
                    'red',
                    'blue',
                    'green',
                    'yellow'
                ],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        }
    });

}

function ShowExpenceList() {

    let summaryText = localStorage.getItem('summaryText');
    let descText = localStorage.getItem('descText');
    let amountText = localStorage.getItem('amountText');
    let typeText = localStorage.getItem('typeText');
    let timeText = localStorage.getItem('timeText');



    let summaryTextArr = JSON.parse(summaryText);
    let descTextArr = JSON.parse(descText);
    let amountTextArr = JSON.parse(amountText);
    let typeTextArr = JSON.parse(typeText);
    let timeTextArr = JSON.parse(timeText);

    if (summaryTextArr == null) {
        console.log("Null");
        summaryTextArr = [];
        descTextArr = [];
        amountTextArr = [];
        typeTextArr = [];
        timeTextArr = [];
    }



    if (summaryTextArr.length == 0) {
        tableBody.innerHTML = `
        <p style="width:800px">No Expenses to show. Click On Add Button to add new Expense in Expense Tracker App </p>
        `
        // console.log(document.getElementById('table_body'))
    }
    else {


        let innerHtml = ''

        summaryTextArr.forEach((element, index) => {
            innerHtml +=
                `
            <tr class="data_row">
            <td class="Sr">${index + 1}</td>
            <td class="expence">${element}</td>
            <td class="desc">${descTextArr[index]}</td>
            <td class="price">Rs.${amountTextArr[index]}</td>
            <td class="type">${typeTextArr[index]}</td>
            <td class="date">${timeTextArr[index]}</td>
            <td class="options" id=${index}>
                <a id="link_update" href="Update.html?val=${index}">Update</a>
                <button id="btn_delete" onclick=deleteRecord(${index}) >Delete</button>
            </td>
            </tr>
            
            `
        });
        tableBody.innerHTML = innerHtml

    }

}


function deleteRecord(indexVal) {
    let summaryText = localStorage.getItem('summaryText');
    let descText = localStorage.getItem('descText');
    let amountText = localStorage.getItem('amountText');
    let typeText = localStorage.getItem('typeText');
    let timeText = localStorage.getItem('timeText');
    let summaryTextArr = JSON.parse(summaryText);
    let descTextArr = JSON.parse(descText);
    let amountTextArr = JSON.parse(amountText);
    let typeTextArr = JSON.parse(typeText);
    let timeTextArr = JSON.parse(timeText);

    summaryTextArr.forEach((element, index) => {
        if (index == indexVal) {
            summaryTextArr.splice(index, 1);
            descTextArr.splice(index, 1);
            amountTextArr.splice(index, 1);
            typeTextArr.splice(index, 1);
            timeTextArr.splice(index, 1);
        }


    });

    localStorage.setItem('summaryText', JSON.stringify(summaryTextArr));
    localStorage.setItem('descText', JSON.stringify(descTextArr));
    localStorage.setItem('amountText', JSON.stringify(amountTextArr));
    localStorage.setItem('typeText', JSON.stringify(typeTextArr));
    localStorage.setItem('timeText', JSON.stringify(timeTextArr));
    ShowExpenceList();


}
function updateRecord(indexVal) {
    console.log(`Update record clicked with index:${indexVal} and Sr value is:${indexVal + 1}`);
    updateSr = indexVal + 1;

    let summaryText = localStorage.getItem('summaryText');
    let descText = localStorage.getItem('descText');
    let amountText = localStorage.getItem('amountText');
    let typeText = localStorage.getItem('typeText');
    let timeText = localStorage.getItem('timeText');



    let summaryTextArr = JSON.parse(summaryText);
    let descTextArr = JSON.parse(descText);
    let amountTextArr = JSON.parse(amountText);
    let typeTextArr = JSON.parse(typeText);
    let timeTextArr = JSON.parse(timeText);
    let date = new Date();
    

    summaryTextArr.forEach((element, index) => {
        if (indexVal == index) {
            UpdateSummaryInput.value = element;
            UpdateAmmountInput.value = amountTextArr[index];
            UpdateDescInput.value = descTextArr[index];
            UpdateTypeInput.value = typeTextArr[index];
            UpdateTimeInput.value = date;
            // UpdateSummaryInput.value=element;
        }
    });
}










