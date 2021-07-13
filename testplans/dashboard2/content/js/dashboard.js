/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 0.0, "KoPercent": 100.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.0, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "/assets/bootstrap-table.js-26"], "isController": false}, {"data": [0.0, 500, 1500, "/assets/bootstrap-table.js-16"], "isController": false}, {"data": [0.0, 500, 1500, "/assets/bootstrap-table.js-24"], "isController": false}, {"data": [0.0, 500, 1500, "/success.txt-10"], "isController": false}, {"data": [0.0, 500, 1500, "/success.txt-21"], "isController": false}, {"data": [0.0, 500, 1500, "/success.txt-11"], "isController": false}, {"data": [0.0, 500, 1500, "/success.txt-22"], "isController": false}, {"data": [0.0, 500, 1500, "/success.txt-8"], "isController": false}, {"data": [0.0, 500, 1500, "/success.txt-12"], "isController": false}, {"data": [0.0, 500, 1500, "/favicon.ico-19"], "isController": false}, {"data": [0.0, 500, 1500, "/success.txt-13"], "isController": false}, {"data": [0.0, 500, 1500, "/img/glyphicons-halflings.png-20"], "isController": false}, {"data": [0.0, 500, 1500, "/success.txt-9"], "isController": false}, {"data": [0.0, 500, 1500, "/assets/bootstrap-table.js-30"], "isController": false}, {"data": [0.0, 500, 1500, "/success.txt-27"], "isController": false}, {"data": [0.0, 500, 1500, "/success.txt-28"], "isController": false}, {"data": [0.0, 500, 1500, "/confirmation.php-29"], "isController": false}, {"data": [0.0, 500, 1500, "/assets/bootstrap.min.js-15"], "isController": false}, {"data": [0.0, 500, 1500, "/reserve.php-23"], "isController": false}, {"data": [0.0, 500, 1500, "/assets/bootstrap-table.css-18"], "isController": false}, {"data": [0.0, 500, 1500, "/-14"], "isController": false}, {"data": [0.0, 500, 1500, "/-7"], "isController": false}, {"data": [0.0, 500, 1500, "/assets/bootstrap.min.css-17"], "isController": false}, {"data": [0.0, 500, 1500, "/purchase.php-25"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 242400, 242400, 100.0, 80.9852268976888, 0, 1895, 8.0, 1003.0, 1005.0, 1047.9900000000016, 1871.3811472245811, 4651.0400582876555, 0.0], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/assets/bootstrap-table.js-26", 10100, 10100, 100.0, 48.54485148514846, 0, 1895, 1.0, 11.0, 185.9499999999989, 1004.0, 83.0421377183967, 206.38890673175746, 0.0], "isController": false}, {"data": ["/assets/bootstrap-table.js-16", 10100, 10100, 100.0, 45.05227722772268, 0, 1264, 1.0, 21.0, 210.9499999999989, 1006.0, 90.94920351910383, 226.0407450743352, 0.0], "isController": false}, {"data": ["/assets/bootstrap-table.js-24", 10100, 10100, 100.0, 46.68326732673272, 0, 1568, 1.0, 11.0, 162.9499999999989, 1007.0, 84.4192208356667, 209.8114424089568, 0.0], "isController": false}, {"data": ["/success.txt-10", 10100, 10100, 100.0, 45.14900990099012, 0, 1267, 2.0, 20.0, 236.0, 1012.0, 95.17527327553712, 236.54401414672068, 0.0], "isController": false}, {"data": ["/success.txt-21", 10100, 10100, 100.0, 42.06356435643572, 0, 1343, 1.0, 12.0, 156.0, 1005.9899999999998, 86.47112206982757, 214.91113834737416, 0.0], "isController": false}, {"data": ["/success.txt-11", 10100, 10100, 100.0, 39.50999999999994, 0, 1644, 2.0, 23.0, 171.0, 1003.0, 94.35107943239886, 234.4956026908741, 0.0], "isController": false}, {"data": ["/success.txt-22", 10100, 10100, 100.0, 46.43366336633679, 0, 1475, 1.0, 13.0, 177.0, 1005.0, 85.83763937992929, 213.3367111542188, 0.0], "isController": false}, {"data": ["/success.txt-8", 10100, 10100, 100.0, 233.30990099009938, 0, 1189, 2.0, 1008.0, 1029.0, 1083.0, 95.15733936310534, 236.49944206943658, 0.0], "isController": false}, {"data": ["/success.txt-12", 10100, 10100, 100.0, 39.706039603960505, 0, 1614, 2.0, 24.0, 209.0, 1003.0, 93.47610806208294, 232.32099122851668, 0.0], "isController": false}, {"data": ["/favicon.ico-19", 10100, 10100, 100.0, 48.95247524752477, 0, 1340, 1.0, 16.0, 209.0, 1008.0, 87.95764099348591, 218.60566047697426, 0.0], "isController": false}, {"data": ["/success.txt-13", 10100, 10100, 100.0, 43.10633663366337, 0, 1340, 2.0, 24.0, 247.0, 1005.0, 92.61891443296133, 230.19056370301422, 0.0], "isController": false}, {"data": ["/img/glyphicons-halflings.png-20", 10100, 10100, 100.0, 42.425940594059476, 0, 1331, 1.0, 14.0, 173.89999999999782, 1005.0, 87.21256551736047, 216.7538859782055, 0.0], "isController": false}, {"data": ["/success.txt-9", 10100, 10100, 100.0, 99.99732673267364, 0, 1613, 2.0, 220.0, 1006.9499999999989, 1106.0, 95.1672021784809, 236.52395463304092, 0.0], "isController": false}, {"data": ["/assets/bootstrap-table.js-30", 10100, 10100, 100.0, 47.63732673267334, 0, 1577, 1.0, 9.0, 198.9499999999989, 1005.0, 80.41209206786462, 199.8523186647612, 0.0], "isController": false}, {"data": ["/success.txt-27", 10100, 10100, 100.0, 47.62485148514844, 0, 1846, 1.0, 11.0, 182.9499999999989, 1005.0, 82.37030754299974, 204.71917255559995, 0.0], "isController": false}, {"data": ["/success.txt-28", 10100, 10100, 100.0, 50.06544554455445, 0, 1521, 1.0, 11.0, 225.79999999999563, 1004.0, 81.7079386138774, 203.0729529026543, 0.0], "isController": false}, {"data": ["/confirmation.php-29", 10100, 10100, 100.0, 48.922376237623844, 0, 1578, 1.0, 9.0, 203.9499999999989, 1005.0, 81.05613739416556, 201.45299772280404, 0.0], "isController": false}, {"data": ["/assets/bootstrap.min.js-15", 10100, 10100, 100.0, 41.32178217821774, 0, 1247, 1.0, 19.0, 194.0, 1004.0, 90.23496828374877, 224.26561941615293, 0.0], "isController": false}, {"data": ["/reserve.php-23", 10100, 10100, 100.0, 46.50831683168318, 0, 1223, 1.0, 12.0, 172.9499999999989, 1007.0, 85.11355496565963, 211.53710682383178, 0.0], "isController": false}, {"data": ["/assets/bootstrap-table.css-18", 10100, 10100, 100.0, 42.08980198019803, 0, 1324, 1.0, 20.0, 169.9499999999989, 1004.0, 89.43910171262597, 222.28761119007137, 0.0], "isController": false}, {"data": ["/-14", 10100, 10100, 100.0, 52.39396039603945, 0, 1174, 1.0, 19.0, 248.0, 1007.0, 91.77563129821628, 228.09470864644572, 0.0], "isController": false}, {"data": ["/-7", 10100, 10100, 100.0, 656.2051485148534, 0, 1489, 1001.0, 1045.0, 1079.0, 1201.9799999999996, 94.8534936138242, 235.74427856170172, 0.0], "isController": false}, {"data": ["/assets/bootstrap.min.css-17", 10100, 10100, 100.0, 44.306732673267454, 0, 1243, 1.0, 17.0, 173.9499999999989, 1006.0, 88.65715138428047, 220.3441897197205, 0.0], "isController": false}, {"data": ["/purchase.php-25", 10100, 10100, 100.0, 45.63504950495048, 0, 1571, 1.0, 11.0, 164.69999999999345, 1005.0, 83.72362912919137, 208.08265247440625, 0.0], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 242400, 100.0, 100.0], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 242400, 242400, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 242400, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["/assets/bootstrap-table.js-26", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/assets/bootstrap-table.js-16", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/assets/bootstrap-table.js-24", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/success.txt-10", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/success.txt-21", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/success.txt-11", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/success.txt-22", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/success.txt-8", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/success.txt-12", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/favicon.ico-19", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/success.txt-13", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/img/glyphicons-halflings.png-20", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/success.txt-9", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/assets/bootstrap-table.js-30", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/success.txt-27", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/success.txt-28", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/confirmation.php-29", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/assets/bootstrap.min.js-15", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/reserve.php-23", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/assets/bootstrap-table.css-18", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/-14", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/-7", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/assets/bootstrap.min.css-17", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/purchase.php-25", 10100, 10100, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 127.0.0.1:8888 [/127.0.0.1] failed: Connection refused", 10100, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
