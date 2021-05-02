drpPlant.onclick=function(s){
  if (typeof(s) == "object"){
  return
} else {
    drpPlant.value = s
    lstUserPlant.addItem(s)
    lblSuccess.value = (`Congrats! You have added ${s} to your personal plant log.`)
}
}
btnViewHomePage.onclick=function(){
  ChangeForm(HomePage)
}
