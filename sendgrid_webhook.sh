function localtunnel {
  lt -s okmijnuhb00x00x00asdfllkjsdfjshxuxi --port 3003
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
