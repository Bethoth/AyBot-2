module.exports = class Timer {
    constructor(time,set){
      	this.timeAdd = time
      	this.time = (new Date()).getTime()
      	if(set)this.time+=this.timeAdd
    }
    reset(){
      	this.time = (new Date()).getTime() + this.timeAdd
    }
    get(apply){
      	if(this.time <= (new Date()).getTime()){
        	if(apply)this.reset()
        	return true
      	}
      	return false
    }
    get leftText(){
      	return Timer.text(this.leftTime)
    }
    get leftTime(){
      	return this.time - (new Date()).getTime()
    }
    static text(time){
		let day = 1000*60*60*24
		let hour = 1000*60*60
		let minute = 1000*60
		let timeCount = time
		let days = 0
		let hours = 0
		let minutes = 0
		while(timeCount >= day){
			timeCount -= day
			days ++
		}
		while(timeCount >= hour){
			timeCount -= hour
			hours ++
		}
		while(timeCount >= minute){
			timeCount -= minute
			minutes ++
		}
		let texte = []
		if(days){
			if(days > 1){
				texte.push(`${days} jours`)
			} else {
				texte.push(`une journée`)
			}
		}
		if(hours){
			if(hours > 1){
				texte.push(`${hours} heures`)
			} else {
				texte.push(`une heure`)
			}
		}
		if(minutes){
			if(minutes > 1){
			texte.push(`${minutes} minutes`)
			} else {
			texte.push(`une minute`)
			}
		}
		if(texte.length === 0){
			if(time < 1000){
			texte.push(`maintenant !`)
			} else {
			texte.push(`${Math.ceil(time/1000)} secondes`)
			}
		}
		if(texte.length > 1){
			let last = texte.pop()
			texte[texte.length-1] += ` et ${last}`
		}
		return texte.join(', ')
    }
}