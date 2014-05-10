document.getElementById("add").addEventListener("click",addNewItem);

$(document).ready(function() {
	var d = new Date().getDay();
	var whichTab = '#dayTab li:eq('+d+') a';
	$(whichTab).tab('show');

    var data = window.localStorage.getItem('record');
    var record = JSON.parse(data);
    if(record == null){
    	$("#Monday").html("今天没什么好看的诶~");
    	$("#Tuesday").html("今天没什么好看的诶~");
    	$("#Wednesday").html("今天没什么好看的诶~");
    	$("#Thursday").html("今天没什么好看的诶~");
    	$("#Friday").html("今天没什么好看的诶~");
    	$("#Saturday").html("今天没什么好看的诶~");
    	$("#Sunday").html("今天没什么好看的诶~");
    }
    else{
    	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
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

function addNewItem(){
	var day = $("#daySelect").val();
	var name = $("#aniName").val();
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

function plusAni(target){
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
    var episodeNode = target.parentNode.parentNode.childNodes[1];
    var num = parseInt(episodeNode.innerHTML) + 1;
    episodeNode.innerHTML = num;
}

function minusAni(target){
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
    var episodeNode = target.parentNode.parentNode.childNodes[1];
    var num = parseInt(episodeNode.innerHTML);
    if(num > 0){
        num -= 1;
    }
    episodeNode.innerHTML = num;
}

function editAni(target){
    console.log(title);
}

function deleteAni(target){
    console.log(title);
}
