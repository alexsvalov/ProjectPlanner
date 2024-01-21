using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Изделие
/// </summary>
public partial class Product
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Обозначение
    /// </summary>
    public string CodeStr { get; set; } = null!;

    /// <summary>
    /// Наименование
    /// </summary>
    public string Name { get; set; } = null!;

    /// <summary>
    /// Тип изделия
    /// </summary>
    public long TypeId { get; set; }

    /// <summary>
    /// Вид изделия
    /// </summary>
    public long KindId { get; set; }

    /// <summary>
    /// Группа изделия
    /// </summary>
    public long GroupId { get; set; }

    public bool IsPurchase { get; set; }

    public bool? IsActive { get; set; }

    public virtual ProductGroupDict Group { get; set; } = null!;

    public virtual ProductKindDict Kind { get; set; } = null!;

    public virtual ICollection<OrderCompose> OrderComposes { get; set; } = new List<OrderCompose>();

    public virtual ICollection<ProductCompose> ProductComposeComponents { get; set; } = new List<ProductCompose>();

    public virtual ICollection<ProductCompose> ProductComposeProducts { get; set; } = new List<ProductCompose>();

    public virtual ICollection<ProductCost> ProductCosts { get; set; } = new List<ProductCost>();

    public virtual ICollection<ProductDetail> ProductDetails { get; set; } = new List<ProductDetail>();

    public virtual ICollection<ProductPurchasePrice> ProductPurchasePrices { get; set; } = new List<ProductPurchasePrice>();

    public virtual ICollection<ProductPurchase> ProductPurchases { get; set; } = new List<ProductPurchase>();

    public virtual ProductTypeDict Type { get; set; } = null!;
}
