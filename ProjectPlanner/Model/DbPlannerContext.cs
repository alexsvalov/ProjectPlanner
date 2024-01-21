using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ProjectPlanner.Model;

public partial class DbPlannerContext : DbContext
{
    public DbPlannerContext()
    {
    }

    public DbPlannerContext(DbContextOptions<DbPlannerContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<FixedCostRatio> FixedCostRatios { get; set; }

    public virtual DbSet<MarkSteelDict> MarkSteelDicts { get; set; }

    public virtual DbSet<Material> Materials { get; set; }

    public virtual DbSet<MaterialGroupDict> MaterialGroupDicts { get; set; }

    public virtual DbSet<MaterialPrice> MaterialPrices { get; set; }

    public virtual DbSet<MaterialTypeDict> MaterialTypeDicts { get; set; }

    public virtual DbSet<OrderCompose> OrderComposes { get; set; }

    public virtual DbSet<OrderCost> OrderCosts { get; set; }

    public virtual DbSet<OrderProduct> OrderProducts { get; set; }

    public virtual DbSet<PlanCompose> PlanComposes { get; set; }

    public virtual DbSet<PlanProduct> PlanProducts { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductCompose> ProductComposes { get; set; }

    public virtual DbSet<ProductCost> ProductCosts { get; set; }

    public virtual DbSet<ProductDetail> ProductDetails { get; set; }

    public virtual DbSet<ProductGroupDict> ProductGroupDicts { get; set; }

    public virtual DbSet<ProductKindDict> ProductKindDicts { get; set; }

    public virtual DbSet<ProductPurchase> ProductPurchases { get; set; }

    public virtual DbSet<ProductPurchasePrice> ProductPurchasePrices { get; set; }

    public virtual DbSet<ProductTypeDict> ProductTypeDicts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=ConnectionStrings:dbPlanner");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("customer_id_pk");

            entity.ToTable("customer", tb => tb.HasComment("Заказчик"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.AddressStr)
                .HasMaxLength(500)
                .HasComment("Адрес заказчика")
                .HasColumnName("address_str");
            entity.Property(e => e.InnStr)
                .HasMaxLength(12)
                .HasComment("ИНН заказчика")
                .HasColumnName("inn_str");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(300)
                .HasComment("Краткое наименование заказчика")
                .HasColumnName("name");
        });

        modelBuilder.Entity<FixedCostRatio>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("total_cost_ratio_id_pk");

            entity.ToTable("fixed_cost_ratio", tb => tb.HasComment("Коэффициент постоянных расходов"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.FinishDate)
                .HasDefaultValueSql("'4000-12-31 00:00:00'::timestamp without time zone")
                .HasComment("Дата окончания действия")
                .HasColumnName("finish_date");
            entity.Property(e => e.RatioNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("1.00")
                .HasComment("Коэффициент постоянных расходов")
                .HasColumnName("ratio_num");
            entity.Property(e => e.StartDate)
                .HasDefaultValueSql("now()")
                .HasComment("Дата начала действия")
                .HasColumnName("start_date");
        });

        modelBuilder.Entity<MarkSteelDict>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("mark_steel_dict_id_pk");

            entity.ToTable("mark_steel_dict", tb => tb.HasComment("Марка стали"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasComment("Наименование")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Material>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("material_id_pk");

            entity.ToTable("material", tb => tb.HasComment("Материал"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.GroupId)
                .HasComment("Группа материала")
                .HasColumnName("group_id");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.LenghtNum)
                .HasComment("Длина материала")
                .HasColumnName("lenght_num");
            entity.Property(e => e.MarkSteelId)
                .HasComment("Марка стали")
                .HasColumnName("mark_steel_id");
            entity.Property(e => e.Name)
                .HasMaxLength(300)
                .HasComment("Наименование")
                .HasColumnName("name");
            entity.Property(e => e.PriceNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Цена с НДС за 1 т")
                .HasColumnName("price_num");
            entity.Property(e => e.SizeStr)
                .HasMaxLength(100)
                .HasComment("Размер материала")
                .HasColumnName("size_str");
            entity.Property(e => e.TypeId)
                .HasComment("Тип материала")
                .HasColumnName("type_id");

            entity.HasOne(d => d.Group).WithMany(p => p.Materials)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("material_material_group_dict_id_fk");

            entity.HasOne(d => d.MarkSteel).WithMany(p => p.Materials)
                .HasForeignKey(d => d.MarkSteelId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("material_material_mark_steel_dict_id_fk");

            entity.HasOne(d => d.Type).WithMany(p => p.Materials)
                .HasForeignKey(d => d.TypeId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("material_material_type_dict_id_fk");
        });

        modelBuilder.Entity<MaterialGroupDict>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("material_group_dict_id_pk");

            entity.ToTable("material_group_dict", tb => tb.HasComment("Группа материала"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(300)
                .HasComment("Наименование")
                .HasColumnName("name");
        });

        modelBuilder.Entity<MaterialPrice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("material_price_id_pk");

            entity.ToTable("material_price", tb => tb.HasComment("Цена материала"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.FinishDate)
                .HasDefaultValueSql("'4000-12-31 00:00:00'::timestamp without time zone")
                .HasComment("Дата окончания действия")
                .HasColumnName("finish_date");
            entity.Property(e => e.IsManual)
                .HasComment("Признак ручного ввода")
                .HasColumnName("is_manual");
            entity.Property(e => e.MaterialId)
                .HasComment("Материал")
                .HasColumnName("material_id");
            entity.Property(e => e.PriceNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Цена с НДС за 1 т")
                .HasColumnName("price_num");
            entity.Property(e => e.StartDate)
                .HasDefaultValueSql("now()")
                .HasComment("Дата начала действия")
                .HasColumnName("start_date");

            entity.HasOne(d => d.Material).WithMany(p => p.MaterialPrices)
                .HasForeignKey(d => d.MaterialId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("material_price_material_id_fk");
        });

        modelBuilder.Entity<MaterialTypeDict>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("material_type_dict_id_pk");

            entity.ToTable("material_type_dict", tb => tb.HasComment("Тип материала"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(300)
                .HasComment("Наименование")
                .HasColumnName("name");
        });

        modelBuilder.Entity<OrderCompose>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("order_compose_id_pk");

            entity.ToTable("order_compose", tb => tb.HasComment("Состав заказа"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.OrderId)
                .HasComment("Заказ")
                .HasColumnName("order_id");
            entity.Property(e => e.ProductId)
                .HasComment("Изделие")
                .HasColumnName("product_id");
            entity.Property(e => e.QuantityNum)
                .HasDefaultValueSql("1")
                .HasComment("Количество")
                .HasColumnName("quantity_num");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderComposes)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("order_compose_order_id_fk");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderComposes)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("order_compose_product_id_fk");
        });

        modelBuilder.Entity<OrderCost>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("order_cost_id_pk");

            entity.ToTable("order_cost", tb => tb.HasComment("Себестоимость заказа"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.FinishDate)
                .HasDefaultValueSql("now()")
                .HasComment("Дата окончания действия")
                .HasColumnName("finish_date");
            entity.Property(e => e.FixedCostNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Постоянные расходы")
                .HasColumnName("fixed_cost_num");
            entity.Property(e => e.LabourCostNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Расходы на оплату труда")
                .HasColumnName("labour_cost_num");
            entity.Property(e => e.MaterialCostNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Материальные затраты")
                .HasColumnName("material_cost_num");
            entity.Property(e => e.OrderProductId)
                .HasComment("Заказ")
                .HasColumnName("order_product_id");
            entity.Property(e => e.PurchaseCostNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Стоимость покупных изделий")
                .HasColumnName("purchase_cost_num");
            entity.Property(e => e.StartDate)
                .HasDefaultValueSql("now()")
                .HasComment("Дата начала действия")
                .HasColumnName("start_date");
            entity.Property(e => e.TotalCostNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Общие расходы")
                .HasColumnName("total_cost_num");

            entity.HasOne(d => d.OrderProduct).WithMany(p => p.OrderCosts)
                .HasForeignKey(d => d.OrderProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("order_cost_order_product_id_fk");
        });

        modelBuilder.Entity<OrderProduct>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("order_product_id_pk");

            entity.ToTable("order_product", tb => tb.HasComment("Заказ"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.CreateDate)
                .HasDefaultValueSql("CURRENT_DATE")
                .HasComment("Дата создания заказа")
                .HasColumnName("create_date");
            entity.Property(e => e.CustomerId)
                .HasComment("Заказчик")
                .HasColumnName("customer_id");
            entity.Property(e => e.DeliveryCostNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Расходы на доставку")
                .HasColumnName("delivery_cost_num");
            entity.Property(e => e.ExecDate)
                .HasDefaultValueSql("(CURRENT_DATE + 10)")
                .HasComment("Дата выполнения заказа")
                .HasColumnName("exec_date");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.OrderNum)
                .HasComment("Номер заказа")
                .HasColumnName("order_num");
            entity.Property(e => e.PriceNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Цена заказа без НДС")
                .HasColumnName("price_num");

            entity.HasOne(d => d.Customer).WithMany(p => p.OrderProducts)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("order_product_customer_id_fk");
        });

        modelBuilder.Entity<PlanCompose>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("plan_compose_id_pk");

            entity.ToTable("plan_compose", tb => tb.HasComment("Состав плана производства"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.OrderProductId)
                .HasComment("Заказ")
                .HasColumnName("order_product_id");
            entity.Property(e => e.PlanProductId)
                .HasComment("План производства")
                .HasColumnName("plan_product_id");

            entity.HasOne(d => d.OrderProduct).WithMany(p => p.PlanComposes)
                .HasForeignKey(d => d.OrderProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("plan_compose_order_product_id_fk");

            entity.HasOne(d => d.PlanProduct).WithMany(p => p.PlanComposes)
                .HasForeignKey(d => d.PlanProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("plan_compose_plan_product_id_fk");
        });

        modelBuilder.Entity<PlanProduct>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("plan_product_id_pk");

            entity.ToTable("plan_product", tb => tb.HasComment("План производства"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.CreateDate)
                .HasDefaultValueSql("CURRENT_DATE")
                .HasComment("Дата создания плана")
                .HasColumnName("create_date");
            entity.Property(e => e.Description)
                .HasMaxLength(300)
                .HasColumnName("description");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.VersionNum)
                .HasComment("Версия плана")
                .HasColumnName("version_num");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("product_id_pk");

            entity.ToTable("product", tb => tb.HasComment("Изделие"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.CodeStr)
                .HasMaxLength(100)
                .HasComment("Обозначение")
                .HasColumnName("code_str");
            entity.Property(e => e.GroupId)
                .HasComment("Группа изделия")
                .HasColumnName("group_id");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.IsPurchase).HasColumnName("is_purchase");
            entity.Property(e => e.KindId)
                .HasComment("Вид изделия")
                .HasColumnName("kind_id");
            entity.Property(e => e.Name)
                .HasMaxLength(300)
                .HasComment("Наименование")
                .HasColumnName("name");
            entity.Property(e => e.TypeId)
                .HasComment("Тип изделия")
                .HasColumnName("type_id");

            entity.HasOne(d => d.Group).WithMany(p => p.Products)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("product_product_group_dict_id_fk");

            entity.HasOne(d => d.Kind).WithMany(p => p.Products)
                .HasForeignKey(d => d.KindId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("product_product_kind_dict_id_fk");

            entity.HasOne(d => d.Type).WithMany(p => p.Products)
                .HasForeignKey(d => d.TypeId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("product_product_type_dict_id_fk");
        });

        modelBuilder.Entity<ProductCompose>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("product_compose_id_pk");

            entity.ToTable("product_compose", tb => tb.HasComment("Составное изделие"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.ComponentId)
                .HasComment("Составная часть")
                .HasColumnName("component_id");
            entity.Property(e => e.ProductId)
                .HasComment("Изделие")
                .HasColumnName("product_id");
            entity.Property(e => e.QuantityNum)
                .HasDefaultValueSql("1")
                .HasComment("Количество")
                .HasColumnName("quantity_num");

            entity.HasOne(d => d.Component).WithMany(p => p.ProductComposeComponents)
                .HasForeignKey(d => d.ComponentId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("product_compose_component_id_fk");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductComposeProducts)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("product_compose_product_id_fk");
        });

        modelBuilder.Entity<ProductCost>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("product_cost_id_pk");

            entity.ToTable("product_cost", tb => tb.HasComment("Себестоимость изделия"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.FinishDate)
                .HasDefaultValueSql("now()")
                .HasComment("Дата окончания действия")
                .HasColumnName("finish_date");
            entity.Property(e => e.FixedCostNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Постоянные расходы")
                .HasColumnName("fixed_cost_num");
            entity.Property(e => e.LabourCostNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Расходы на оплату труда")
                .HasColumnName("labour_cost_num");
            entity.Property(e => e.MaterialCostNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Материальные затраты")
                .HasColumnName("material_cost_num");
            entity.Property(e => e.ProductId)
                .HasComment("Изделие")
                .HasColumnName("product_id");
            entity.Property(e => e.PurchaseCostNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Стоимость покупных изделий")
                .HasColumnName("purchase_cost_num");
            entity.Property(e => e.StartDate)
                .HasDefaultValueSql("now()")
                .HasComment("Дата начала действия")
                .HasColumnName("start_date");
            entity.Property(e => e.TotalCostNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Общие расходы")
                .HasColumnName("total_cost_num");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductCosts)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("product_cost_product_id_fk");
        });

        modelBuilder.Entity<ProductDetail>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("product_detail_id_pk");

            entity.ToTable("product_detail", tb => tb.HasComment("Деталь"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.LabourRatioNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("1.00")
                .HasComment("Коэффициент трудоемкости")
                .HasColumnName("labour_ratio_num");
            entity.Property(e => e.LenghtNum)
                .HasComment("Длина заготовки")
                .HasColumnName("lenght_num");
            entity.Property(e => e.MaterialId)
                .HasComment("Материал")
                .HasColumnName("material_id");
            entity.Property(e => e.ProductId)
                .HasComment("Изделие")
                .HasColumnName("product_id");
            entity.Property(e => e.WeightNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("1.00")
                .HasComment("Масса заготовки")
                .HasColumnName("weight_num");
            entity.Property(e => e.WidthNum)
                .HasComment("Ширина заготовки")
                .HasColumnName("width_num");

            entity.HasOne(d => d.Material).WithMany(p => p.ProductDetails)
                .HasForeignKey(d => d.MaterialId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("product_detail_material_id_fk");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductDetails)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("product_detail_product_id_fk");
        });

        modelBuilder.Entity<ProductGroupDict>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("product_group_dict_id_pk");

            entity.ToTable("product_group_dict", tb => tb.HasComment("Группа изделия"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(300)
                .HasComment("Наименование")
                .HasColumnName("name");
        });

        modelBuilder.Entity<ProductKindDict>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("product_kind_dict_id_pk");

            entity.ToTable("product_kind_dict", tb => tb.HasComment("Вид изделия"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasComment("Наименование")
                .HasColumnName("name");
        });

        modelBuilder.Entity<ProductPurchase>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("product_purchase_id_pk");

            entity.ToTable("product_purchase", tb => tb.HasComment("Покупное изделие"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.PriceNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Цена без НДС")
                .HasColumnName("price_num");
            entity.Property(e => e.ProductId)
                .HasComment("Изделие")
                .HasColumnName("product_id");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductPurchases)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("product_purchase_product_id_fk");
        });

        modelBuilder.Entity<ProductPurchasePrice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("product_purchase_price_id_pk");

            entity.ToTable("product_purchase_price", tb => tb.HasComment("Цена покупного изделия"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.FinishDate)
                .HasDefaultValueSql("'4000-12-31 00:00:00'::timestamp without time zone")
                .HasComment("Дата окончания действия")
                .HasColumnName("finish_date");
            entity.Property(e => e.PriceNum)
                .HasPrecision(10, 2)
                .HasDefaultValueSql("0.00")
                .HasComment("Цена без НДС")
                .HasColumnName("price_num");
            entity.Property(e => e.ProductId)
                .HasComment("Изделие")
                .HasColumnName("product_id");
            entity.Property(e => e.StartDate)
                .HasDefaultValueSql("now()")
                .HasComment("Дата начала действия")
                .HasColumnName("start_date");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductPurchasePrices)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("product_purchase_price_product_id_fk");
        });

        modelBuilder.Entity<ProductTypeDict>(entity =>
        {
            entity.HasQueryFilter(e => e.IsActive == true);

            entity.HasKey(e => e.Id).HasName("product_type_dict_id_pk");

            entity.ToTable("product_type_dict", tb => tb.HasComment("Тип изделия"));

            entity.Property(e => e.Id)
                .HasComment("Код")
                .HasColumnName("id");
            entity.Property(e => e.Ident)
                .HasMaxLength(100)
                .HasColumnName("ident");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasComment("Наименование")
                .HasColumnName("name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
