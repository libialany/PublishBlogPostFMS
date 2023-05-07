# state-machine
REST API service with state machine


# How to run application
npm start

## Hit APIs 
- Create: curl -X POST  -H 'Content-Type: application/json' http://localhost:8081/resources/create  --data '{"name": "resource-1"}'
- Get: curl  http://localhost:8081/resources
- Update: curl -X PUT  -H 'Content-Type: application/json' http://localhost:8081/resources/1  --data '{"transition": "start"}'
- Delete: curl -X DELETE http://localhost:8081/resources/1
