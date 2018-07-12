var db = firebase.firestore();
var assigned_id="";
var propertyRef="";
var arrayUserDetails = [];
var propertyDetails = [];
var assigned_property = "";
var displayDetails = "";
var inspectionData = [];
var itemsData = [];
$(document).ready(function(){
    loadDetails();
});

function loadDetails()
{
    firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location = '../../examples/pages/login.html';
        }
        
        var userId = user.uid;


        var userdocRef = db.collection("users").doc(userId);

        userdocRef.get().then(function(doc) {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                arrayUserDetails.push(doc.data());
            
                assigned_property = arrayUserDetails[0].assigned_property;
                $("#inspection tbody").html("");
                $("#title").html('<font size="5"><b>INSPECTIONS</b></font>');

                $("#inspection thead").html("<tr><th>Inspection Name</th><th>Inspection Item Count</th><th>Status</th><th>Overdue By (days)</th><th>Last Submitted</th></tr>");

            db.collection("properties").doc(assigned_property).collection("inspections").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                  // console.log(doc.id, " => ", doc.data());
                   
                   var d = new Date(doc.data().inspection_submitted_at);
                   var n = d.toDateString();
                   var month = n.substring(4,7);
                   var day = n.substring(8,10);
                   var year = n.substring(11,15);
                   var date = day+' '+month+' '+year;
                    
                   itemsData.push(doc.data());

                    displayDetails ='<tr><td onclick="details('+itemsData.length+');" style="cursor:pointer;color:purple;"><b>'+doc.data().inspection_name+'</b></td>'+
                                    '<td>'+doc.data().inspection_items_count+'</td>';
                        if(doc.data().inspection_status == "0")
                        {
                            displayDetails+='<td><span class="dot" style="background-color: #bbb;"></span></td>';
                        }
                        else
                        {
                            displayDetails+='<td><span class="dot" style="background-color: red;"></span></td>';
                        }
                    displayDetails +='<td>'+doc.data().inspection_days+'</td>'+
                                     '<td>'+date+'<td></tr>';
                       
                $("#inspection tbody").append(displayDetails);
                });
            });

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    });
}

function details(length)
{
    var index=length-1;
    $("#inspection tbody").html("");
  
    $("#title").html('<font size="5"><b>'+itemsData[index].inspection_name+'</b></font>');
    $("#inspection thead").html("<tr><th>Inspection Items</th><th>Description</th><th>Condition</th><th>Reference Image</th></tr>");
   

    db.collection("properties").doc(assigned_property).collection("inspections").doc(itemsData[index].inspection_id).collection("items").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            itemsData.push(doc.data().inspection_items);
            displayDetails ='<tr><td style="cursor:pointer;color:purple;"><b>'+doc.data().item_name+'</b></td>'+
                            '<td>'+doc.data().item_description+'</td>'+
                            '<td>'+doc.data().item_condition+'</td>'+             
                            '<td>'+doc.data().item_photo+'</td></tr>';
                
        $("#inspection tbody").append(displayDetails);
        $("#DeleteItem").show();
        $("#AddItem").show();
        });
    });

}