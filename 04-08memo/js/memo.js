"use strict"

window.addEventListener("DOMContentLoaded",
 function(){
    if(typeof localStorage===" undefined"){
        window.alert("このブラウザはLocal Storage 機能が実装されていません");
        return;
    }else{
         saveLocalStorage() ;
       viewStorage();
       selectTable();
       delLocalStorage();
       allClearLocalStorage();
    }
 },false
);


function selectTable(){
    const select=document.getElementById("select");
    select.addEventListener("click",
    function(e){
        e.preventDefault();
        selectCheckBox("select");
    },false
    ); 
}
function selectCheckBox(mode){
    let w_sel="0";
    let w_cnt=0;
    const chkbox1=document.getElementsByName("chkbox1");
    const table1=document.getElementById("table1");
    let w_textkey="";
    let w_textMemo="";

    for(let i=0;i<chkbox1.length;i++){
        if(chkbox1[i].checked){
            if(w_cnt===0){
                w_textkey=table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo=table1.rows[i+1].cells[2].firstChild.data;
            }
            w_cnt++;
           // w_sel="1";
            document.getElementById("textKey").value=w_textkey;
            document.getElementById("textMemo").value=w_textMemo;
            //break;
        }
    }
    if(mode==="select"){
      if(w_cnt===1){
        return w_cnt;
       // w_sel="1";
      }else{

        window.alert("1つ選択してください。") ;
      }
      // return w_sel;
    }
    if (mode === "del") {        
        if (w_cnt >= 1) {
            return w_cnt;        
        } else {
            window.alert("1つ以上選択してください");
            return w_cnt;
        }
    }
}

function saveLocalStorage(){
    const save =document.getElementById("save");
    save.addEventListener("click",
    function(e){
        e.preventDefault();
        const key=document.getElementById("textKey").value;
        const value=document.getElementById("textMemo").value;

        if(key=="" || value==""){
            window.alert("Key,Memoはいずれかも必須です。");
            return;
        }else{
            let w_confirm = confirm("LocalStorageに「" + key + ": " + value + "」を保存しますか？");
            if (w_confirm===true) {  // version-up1 add

            localStorage.setItem(key,value);
            viewStorage();
            
            let w_msg ="localStorageに" + key + " "+ value +"を保存しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value="";
            document.getElementById("textMemo").value="";
        }
    }
    },false
    );
};

function delLocalStorage(){
    const del =document.getElementById("del");
    del.addEventListener("click",
    function(e){
        e.preventDefault();
        const chkbox1=document.getElementsByName("chkbox1");
        const table1=document.getElementById("table1");
       // let w_set ="0";
        let w_cnt ="0";
        //w_set = selectCheckBox();
        w_cnt = selectCheckBox("del");
       

        if(w_cnt>="1"){//if(w_set==="1"){
           // const key=document.getElementById("textKey").value;
           // const value=document.getElementById("textMemo").value;

            let w_confirm = confirm("LocalStorageから選択されている" + w_cnt+ "件を削除しますか？");
            if (w_confirm===true) {  
                for (let i = 0; i < chkbox1.length; i++) {
                    if(chkbox1[i].checked){
                        localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                    }
                }
           viewStorage();  
            //localStorage.removeItem(key);
            let w_msg ="localStorageから" +w_cnt +"を削除しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value="";
            document.getElementById("textMemo").value="";
            viewStorage();
        }
        }
    },false
    );
       
}

function allClearLocalStorage(){
    const allClear =document.getElementById("allClear");
    allClear.addEventListener("click",
    function(e){
        e.preventDefault();
        let w_confirm=confirm("LocalStrong のデータを全て削除します。\n よろしいでしょうか");
       // w_set = selectRadioBtn();
       

        if(w_confirm===true){
            //const key=document.getElementById("textKey").value;
            //const value=document.getElementById("textMemo").value;
            localStorage.clear();
            viewStorage();

            let w_msg ="LocalStorageのデータをすべて削除しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value="";
            document.getElementById("textMemo").value="";
            viewStorage();
        }
    },false
    );
       
}


function viewStorage(){
    const list=document.getElementById("list");
  while(list.rows[0]) list.deleteRow(0);
  for(let i=0;i<localStorage.length;i++){
    let w_key=localStorage.key(i);
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    td1.innerHTML="<input name='chkbox1' type='checkbox'>";
    td2.innerHTML= w_key;
    td3.innerHTML=localStorage.getItem(w_key);

  }
  $("#table1").tablesorter({
    sortList:[[1, 0]] 
  });

   $("#table1").trigger("update");
}
