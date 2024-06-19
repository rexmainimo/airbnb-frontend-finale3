export default class User {
    constructor(id) {
        this.Id = Number(id);
        
        this.name = "";
        this.profilePictureFile = "";
    }
    async getUserInfo(id) {
        try {
            const response = await fetch(`https://localhost:7156/User?userId=${id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                const userInfo = await response.json();
                return userInfo;
            } else {
                console.error('Failed to retrieve user information:', response.statusText);
            }
        } catch (error) {
            console.error('Error retrieving user information:', error);
        }
        return null;
    }
    async getUserName(id){
        try{
            const response = await fetch(`https://localhost:7156/User/userName?userId=${id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }

            });
            if(response.ok){
                const nameData = await response.json();
                this.name = nameData.message;
                //console.log(this.name)
                return this.name;
            }
            else{
                console.error('Failed to retrieve user name:', response.statusText);
                return null;
            }
        }catch(error){
            console.error('Error retrieving user information:', error);
            return null;
        }
    }
    async fetchProfilePicture() {
        try {
          const response = await fetch(`https://localhost:7156/User/pictureFile?userId=${this.Id}`, {
            method: 'GET'
          });
  
          if (response.ok) {
            // console.log("success in getting your image!");
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            this.profilePictureFile = imageUrl;
            return this.profilePictureFile;
          } else {
            console.error('Error fetching profile picture:', await response.text());
          }
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
    }
    async updateUserInfo(userDetail) {
        try{
            let url = 'https://localhost:7156/User/updateInfo';

            let data = {
                "id": userDetail.Id,
                "firstName": userDetail.FirstName,
                "lastName": userDetail.LastName,
                "email": userDetail.Email,
                "password": userDetail.Password,
                "phoneNum": userDetail.PhoneNum,
                "profilePictureUrl": userDetail.ProfilePictureUrl
            };

            fetch(url, {
            method: 'PUT', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
            })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch((error) => console.error('Error:', error));
    
  
        }catch(error){
            console.error("Error Updating user Information:", error);
            throw error;
        }

    }
    async userBookings(){
        
        try{
           
            const response = await fetch(`https://localhost:7156/Booking/user?id=${this.Id}`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                },
            });
            if(response.ok){
                const data =  await response.json();
                
                return data;
                
            }else{
                console.error("Failed to retrieve user name:", response.statusText);
                
            }
        }catch(error){
            console.log("Error retrieving bookings", error);
        }
    }
    
}
