document.getElementById("add").addEventListener("click",addNewItem);
document.getElementById("showAddItem").addEventListener("click",setSelectDay);
document.getElementById("searchBtn").addEventListener("click",search);

$(document).ready(function() {
	var d = new Date().getDay();
	var whichTab = '#dayTab li:eq('+d+') a';
	$(whichTab).tab('show');

    var data = window.localStorage.getItem('record');
    var record = JSON.parse(data);
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    if(record == null){
        for(i in days){
            var id = "#"+days[i];
            $(id).html("今天没什么好看的诶~");
        }
    }
    else{
    	for(i in days){
    		var day = days[i];
    		var dayRecord = record[day];
             var id = "#"+day;
    		if(dayRecord == null){
    			$(id).html("今天没什么好看的诶~");
    		}
    		else{
                var table = document.createElement("table");
                table.className = "table";
                table.style.margin = "0 0 10px 0";
                var thead = document.createElement("thead");
                var tr = document.createElement("tr");
                var th = document.createElement("th");
                th.innerHTML = "Name";
                tr.appendChild(th);
                th = document.createElement("th");
                th.innerHTML = "Episode";
                tr.appendChild(th);
                th = document.createElement("th");
                th.innerHTML = "Action";
                tr.appendChild(th);
                thead.appendChild(tr);
                table.appendChild(thead);
                var tbody = document.createElement("tbody");
                for (name in dayRecord){
                    tr = document.createElement("tr");
                    var td = document.createElement("td");
                    td.innerHTML = name;
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.align = "center";
                    var episode = dayRecord[name];
                    td.innerHTML = episode;
                    tr.appendChild(td);
                    td = document.createElement("td")
                    var a = document.createElement("a");
                    a.title = name;
                    var icon = document.createElement("i");
                    icon.className="fa fa-caret-square-o-up";
                    icon.style.padding = "1px 1px 1px 1px";
                    a.addEventListener("click",function(e){plusAni(e.currentTarget)});
                    a.appendChild(icon);
                    td.appendChild(a);

                    a = document.createElement("a");
                    a.title = name;
                    icon = document.createElement("i");
                    icon.className="fa fa-caret-square-o-down";
                    icon.style.padding = "1px 1px 1px 1px";
                    a.addEventListener("click",function(e){minusAni(e.currentTarget)});
                    a.appendChild(icon);
                    td.appendChild(a);

                    a = document.createElement("a");
                    a.title = name;
                    icon = document.createElement("i");
                    icon.className="fa fa-pencil-square-o";
                    icon.style.padding = "1px 1px 1px 1px";
                    a.addEventListener("click",function(e){editAni(e.currentTarget)});
                    a.appendChild(icon);
                    td.appendChild(a);

                    a = document.createElement("a");
                    a.title = name;
                    icon = document.createElement("i");
                    icon.className="fa fa-times";
                    icon.style.padding = "1px 1px 1px 1px";
                    a.addEventListener("click",function(e){deleteAni(e.currentTarget)});
                    a.appendChild(icon);
                    td.appendChild(a);

                    tr.appendChild(td)
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);
                document.getElementById(day).appendChild(table);
    		}
    	}
    }
});


function search(){
    var keyword = $("#searchText").val().toLowerCase();
    var record = JSON.parse(window.localStorage.getItem('record'));
    var found = false;
    var foundDay = null;
    var foundName = null;
    for(day in record){
        if(!found){
            var dayRecord = record[day];
            for(name in dayRecord){
                if(name.toLowerCase().indexOf(keyword) != -1){
                    found = true;
                    foundName = name;
                    foundDay  = day;
                }
            }
        }
    }
    if(found){
        var href = "#"+foundDay;
        var whichTab = "#dayTab a[href='"+href+"']";
        $(whichTab).tab('show');
    }
}

function setSelectDay(){
    var d = new Date().getDay();
    $('#daySelect option:eq('+d+')').prop('selected', true);
}

function addNewItem(){
	var day = $("#daySelect").val();
	var name = $("#aniName").val();
	if(name != ''){
        var record = window.localStorage.getItem('record');
        if(record == null){
            //no record that day,create a new one
            var jsonData = '{"' + day + '":{"'+name+'":1}}';
            window.localStorage.setItem('record',jsonData);
        }
        else{
            console.log(record);
            var obj = JSON.parse(record);
            var dayRecord = obj[day];
            if(dayRecord == null){
                //no record for that day
                var s = {};
                s[name] = 1;
                obj[day] = s;
            }
            else{
                var aniRecord = dayRecord[name];
                if(aniRecord == null){
                    //no record in that day for that animation
                    dayRecord[name] = 1;
                    obj[day] = dayRecord;
                }
            }
            jsonData = JSON.stringify(obj);
            window.localStorage.setItem('record',jsonData);
        }
        window.location.reload();
    }
    else{
        $("#newitem").collapse("hide");
    }
	
}

function plusAni(target){
    var episodeNode = target.parentNode.parentNode.childNodes[1];
    if(episodeNode.childNodes[0].nodeType == 3){
        //if in the edit mode, the child is an input and the return value is 1
        var title = target.title;
        var record = JSON.parse(window.localStorage.getItem('record'));
        var found = false;
        for(day in record){
            if(!found){
                var dayRecord = record[day];
                for (name in dayRecord){
                    if(name == title){           
                        var num = dayRecord[name];
                        num += 1;
                        dayRecord[name] = num;
                        found = true;
                    }
                }
            }
        }
        window.localStorage.setItem('record',JSON.stringify(record));
        var num = parseInt(episodeNode.innerHTML) + 1;
        episodeNode.innerHTML = num;
    }
}

function minusAni(target){
    var episodeNode = target.parentNode.parentNode.childNodes[1];
    if(episodeNode.childNodes[0].nodeType == 3){
        //if in the edit mode, the child is an input and the return value is 1
        var title = target.title;
        var title = target.title;
        var record = JSON.parse(window.localStorage.getItem('record'));
        var found = false;
        for(day in record){
            if(!found){
                var dayRecord = record[day];
                for (name in dayRecord){
                    if(name == title){           
                        var num = dayRecord[name];
                        if(num > 0){
                            num = num - 1;
                        }
                        dayRecord[name] = num;
                        found = true;
                    }
                }
            }
        }
        window.localStorage.setItem('record',JSON.stringify(record));
        
        var num = parseInt(episodeNode.innerHTML);
        if(num > 0){
            num -= 1;
        }
        episodeNode.innerHTML = num;
    }
}

function editAni(target){
    var episodeNode = target.parentNode.parentNode.childNodes[1];
    if(episodeNode.childNodes[0].nodeType == 3){
        var text = document.createElement("input")
        text.type = "text";
        text.style.width = "30px";
        text.style.height = "19px";
        text.style.padding = "0 0 0 0";
        text.style.textAlign = "right";
        text.style.fontSize = "11px";
        var num = parseInt(episodeNode.innerHTML);
        text.value = num;
        episodeNode.innerHTML = '';
        episodeNode.appendChild(text);
    }
    else{
        var textNode = episodeNode.childNodes[0]
        var num = parseInt(textNode.value);
        var title = target.title;
        var record = JSON.parse(window.localStorage.getItem('record'));
        var found = false;
        for(day in record){
            if(!found){
                var dayRecord = record[day];
                for (name in dayRecord){
                    if(name == title){           
                        dayRecord[name] = num;
                        found = true;
                    }
                }
            }
        }
        window.localStorage.setItem('record',JSON.stringify(record));
        episodeNode.removeChild(textNode)
        episodeNode.innerHTML = num;
    }
    
}

function deleteAni(target){
    var title = target.title;
    var record = JSON.parse(window.localStorage.getItem('record'));
    var found = false;
    var daytodelete = null;
    for(day in record){
        if(!found){
            var dayRecord = record[day];
            for (name in dayRecord){
                if(name == title){           
                    found = true;
                }
            }
            if(found){
                delete dayRecord[title];
                record[day] = dayRecord;
                var trNode = target.parentNode.parentNode;
                var tbodyNode = trNode.parentNode;
                var size = 0;
                for (key in dayRecord){
                    size += 1;
                }
                if(size == 0){
                    daytodelete = day;
                    var tableNode = tbodyNode.parentNode;
                    var divNode = tableNode.parentNode;
                    divNode.removeChild(tableNode);
                    divNode.innerHTML =  "今天没什么好看的诶~";
                }
                else{
                    tbodyNode.removeChild(trNode);
                }
            }
        }
    }
    delete record[daytodelete];
    window.localStorage.setItem('record',JSON.stringify(record));
}
