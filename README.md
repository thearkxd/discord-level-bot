# Discord Level Bot

# Kurulum
* İlk olarak bilgisayarına [Node JS](https://nodejs.org/en/) indir.
* Daha sonra bir [MongoDB](http://mongodb.com) hesabı oluştur ve connection linki al.
  * Eğer bunu yapmayı bilmiyorsan [buraya](https://medium.com/@thearkxd/node-js-projeleri-için-mongodb-atlas-connection-linki-alma-5d955bbe5ae6) tıklayarak medium.com üzerinde yazdığım yazıyı inceleyebilirsin.
* Bu projeyi zip halinde indir.
* Herhangi bir klasöre zipi çıkart.
* Daha sonra `src` klasörünün içindeki configs klasörünün içine gir `settings.json` ve `config.json` dosyalarının içindeki bilgileri doldur.
* Sonra klasörün içerisinde bir `powershell` ya da `cmd` penceresi aç.
* ```npm install``` yazarak tüm modülleri kur.
* Kurulum bittikten sonra ```npm start``` yaz ve botu başlat.

Tada 🎉. Artık level botun hazır. Dilediğin gibi kullanabilirsin.

# Önemli Bilgiler
* `config.json` dosyasında `xpToAdd` kısmına `"1-20"` yazarsanız (örnek), her mesajda 1 ile 20 arasında rastgele bir sayıda xp ekleyecektir!
* `config.json` dosyasında `nextLevelXP` parametresi, kaç xp'de bir level atlanacağını ayarlar. (bir sonraki levelin xp'si; `kişinin leveli * nextLevelXP` olarak hesaplanır.)
* `config.json` dosyasında `removeOldRoles` parametresi ise; eğer `true` yazarsanız her level atladığında bir önceki levelin rollerini alır. Eğer `false` olarak kalırsa almaz!

# İletişim
* [Discord Sunucum](https://discord.gg/UEPcFtytcc)
* [Discord Profilim](https://discord.com/users/350976460313329665)
* Herhangi bir hata bulmanız durumunda ya da yardım isteyeceğiniz zaman buralardan bana ulaşabilirsiniz.

### NOT: Botta MIT lisansı bulunmaktadır. Bu botun dosyalarının benden habersiz paylaşılması/satılması durumunda gerekli işlemler yapılacaktır!
