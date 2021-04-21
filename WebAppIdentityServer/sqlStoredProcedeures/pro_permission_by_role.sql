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
                
			from inns_managerial_dev.functions f 
					join inns_managerial_dev.permissions pr on f.Id = pr.FunctionId
					left join inns_managerial_dev.commands c on pr.CommandId = c.Id
					left join inns_managerial_dev.approles r on pr.AppRoleId=r.Id
                             
			where pr.AppRoleId = roleId
			GROUP BY f.Id, f.ParentId; 
END$$
DELIMITER ;

 
 call pro_permission_by_role("08d8a29c-17be-4d05-8b5f-1456f6dc3dc5")
 
