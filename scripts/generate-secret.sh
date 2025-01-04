echo "Genereting secret...."
openssl rand -base64 32 > secret.txt
echo \ >> secret.txt
echo "------------------------------------------------------------------" >> secret.txt
echo "secret ini di buat untuk memudahkan anda dalam membuat secretkey" >> secret.txt
echo "contoh seperti secret jwt" >> secret.txt
echo "Secret generated and saved to secret.txt"