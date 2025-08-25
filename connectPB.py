from pocketbase import Client

# Initialize the client with your PocketBase instance URL
client = Client('http://127.0.0.1:8090') # Replace with your PocketBase URL

# Example: List records from a collection named "example"
try:
    result = client.records.get_list("example", 1, 20)
    print("Records:", result.items)
except Exception as e:
    print(f"Error fetching records: {e}")


# Example: Authenticate as an admin
try:
    admin_data = client.admins.auth_via_email("admin@mail.com", "myPassword")
    print("Admin authenticated:", admin_data.admin.email)
except Exception as e:
    print(f"Error authenticating admin: {e}")