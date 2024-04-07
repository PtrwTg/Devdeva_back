# Devdeva Sql test
4.1 SELECT ข้อมูล STORE ที่มี Region เป็น East
SELECT *
FROM STORE
WHERE Region = 'East';

- คำสั่งนี้เป็นการเลือกข้อมูลทั้งหมด (*) จากตาราง STORE โดยมีเงื่อนไขว่า Region ต้องเป็น 'East'
- ผลลัพธ์จะแสดงข้อมูลของร้าน STORE ทุก column ที่อยู่ในภูมิภาค East

4.2 SELECT ข้อมูล PRODUCT ที่มีขายใน STORE New York
SELECT p.*
FROM PRODUCT p
JOIN SALES_FACT s ON p.Product_key = s.Product_key
WHERE s.Store_key = (SELECT Store_key FROM STORE WHERE City = 'New York');

- เป็นการเลือกข้อมูลสินค้าทั้งหมดจากตาราง PRODUCT (p.*) ที่มีการขายในร้าน New York
- ใช้การ JOIN ตาราง PRODUCT กับ SALES_FACT ด้วย Product_key เพื่อหาสินค้าที่มียอดขายในร้าน
- เงื่อนไขคือ Store_key ของ SALES_FACT ต้องตรงกับ Store_key ของร้าน New York ที่ query ย่อยไปหามา
4.3 SELECT ยอดรวม Profit ของ STORE New York
SELECT SUM(Profit) AS Total_Profit
FROM SALES_FACT
WHERE Store_key = (SELECT Store_key FROM STORE WHERE City = 'New York');

- เป็นการหายอดรวมกำไร (SUM(Profit)) จากตาราง SALES_FACT
- โดยมีเงื่อนไขให้เอาเฉพาะยอดขายของร้าน New York จาก Store_key ที่ query ย่อยไปหามา
- ใช้ AS Total_Profit เพื่อตั้งชื่อ alias ให้ column ผลรวมกำไร
- 
4.4 DELETE ข้อมูล SALE_FACT ที่ PRODUCT มี Brand เป็น Wolf
DELETE FROM SALES_FACT
WHERE Product_key IN (SELECT Product_key FROM PRODUCT WHERE Brand = 'Wolf');

- เป็นการลบข้อมูลรายการขายออกจากตาราง SALES_FACT
- โดยจะลบเฉพาะรายการขายที่เป็นสินค้ายี่ห้อ Wolf
- ใช้ subquery หา Product_key ของสินค้า Wolf จากตาราง PRODUCT มา filter ใน WHERE

4.5 UPDATE Brand ของ PRODUCT ที่มี Description เป็น Toy Story ให้ Brand เป็น W
UPDATE PRODUCT
SET Brand = 'W'
WHERE Description = 'Toy Story';

- เป็นการอัปเดตแก้ไขข้อมูลในตาราง PRODUCT
- โดยจะเปลี่ยนแปลงค่า Brand ให้เป็น 'W' สำหรับแถวที่มี Description เป็น 'Toy Story'
