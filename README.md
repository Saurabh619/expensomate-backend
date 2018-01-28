# Expensomate-backend Server
Backend Server empowering people to manage, track and do analysis of their expenses!

# API Documentation

### Rest API Endpoints

BaseURL: 'https://api.expensomate.ai/api'

### Model: Group

 | Type | Endpoint  | Task |
 | ---- | ------------- | ------------- |
 | POST | /groups | Create Group  |
 | GET | /groups/find  | Find Group  |
 | GET | /groups/findById  | FindById Group  |
 | GET | /groups/count  | Count Group  |
 | GET | /groups/{groupId}/members  | Find Members of a Group  |

##### Group Creation Sample Request Object

```json
 request_object : {
   "name": ""
}
 ```

### Model: Member

| Type | Endpoint  | Task |
| ---- | ------------- | ------------- |
| POST | /members | Signup Member  |
| POST | /members/login  | Login Member  |
| POST | /members/logout  | Logout Member  |
| POST | /members/reset  | Reset Member Password with email  |
| GET | /members/findById  | FindById Member  |
| POST | /members/invite  | Invite Member via email/SMS |
| POST | /members/{memberId}/expenses  | Create Expense for a Member |
| GET | /members/{memberId}/expenses  | Find Expense of a Member |
| GET | /members/{memberId}/expenses/count  | Count Expense of a Member |

##### Member Signup Sample Request Object

 ```json
 request_object : {
   "name": "",
   "email": "",
   "phone": "",
   "username": "",
   "password": ""
 }
 ```

### Model: Expense

| Type | Endpoint  | Task |
| ---- | ------------- | ------------- |
| POST | /expenses  | Create Expense  |

##### Expense Creation Sample Request Object

```json
request_object : {
  "memberId": "", // required
  "amount": "",  // required
  "reason": "", // optional
  "split": [  
    {
      "splitWith": "",
      "splitAs": ""
    }
  ],  //optional
  "recipt": ""  // optional
}
```
