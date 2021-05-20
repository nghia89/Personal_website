 DROP PROCEDURE pro_permission_by_role;
 
DELIMITER $$
CREATE PROCEDURE pro_permission_by_role(
			IN roleId char(36)
)

BEGIN
			select		
				f.Id,
				f.Name,
				f.ParentId,
				sum(case when c.Id = 'CREATE' then 1 else 0 end) as HasCreate,
				sum(case when c.Id = 'UPDATE' then 1 else 0 end) as HasUpdate,
				sum(case when c.Id = 'DELETE' then 1 else 0 end) as HasDelete,
				sum(case when c.Id = 'VIEW' then 1 else 0 end) as HasView
                
			from db_heomayshop.functions f 
					join db_heomayshop.permissions pr on f.Id = pr.FunctionId
					left join db_heomayshop.commands c on pr.CommandId = c.Id
					left join db_heomayshop.approles r on pr.AppRoleId=r.Id
                             
			where pr.AppRoleId = roleId
			GROUP BY f.Id, f.ParentId; 
END$$
DELIMITER ;

 
 call pro_permission_by_role("08d8a29c-17be-4d05-8b5f-1456f6dc3dc5")
 
